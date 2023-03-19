import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { User } from 'types/User';
import { MessageItem } from 'types/Conversation';
import { getConversationDetailState } from 'store/selectors/conversation';
import { Header, MessageInput, MessageList } from './components';
import { PLoadingIndicator } from 'app/components/PLoadingIndicatior';
import { useWindowSize } from 'utils/hook';
import { isMobileView } from 'utils/helpers';
import OutletPhoneModal from 'app/components/PhoneModal';
import debounce from 'lodash.debounce';
import { useConversationSlice } from 'store/slices/conversation';
import { useSessionSlice } from 'store/slices/session';
import {pxToRem} from "../../../styles/theme/utils";

interface Props {
  roomId: number;
  fromUserName?: string;
  messageContent?: string;
  token?: string;
  refreshToken?: string;
  fromUserPhone: string;
  fromUserRole: number;
  toUserPhone: string;
  toUserRole: number;
  onClose?: () => void;
}

const socketGatewayHost = process.env.REACT_APP_API_CONVERSATION_URL || '';

const ConversationContainer = styled.div`
  background: ${(p) => p.theme.backgroundVariant};
  height: 90%;
  width: 50vw;
  border-radius: 1rem;
  margin: ${pxToRem(10)}rem 0;
`;

const MessageWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  width: 100%;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Room {
  id: number;
  roomKey: string;
  fromUser: User;
  toUser: User;
  name?: string;
  started: boolean;
  createdAt: Date;
  updatedAt: Date;
  message?: string;
}

export const Conversation: React.FC<Props> = ({
  roomId = NaN,
  messageContent,
  fromUserName = '',
  token,
  refreshToken,
  fromUserPhone,
  fromUserRole,
  toUserPhone,
  toUserRole,
  onClose,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { width } = useWindowSize();

  const { actions: conversationActions } = useConversationSlice();
  const { actions: sessionActions } = useSessionSlice();

  const socketRef = useRef<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [roomInfo, setRoomInfo] = useState<Room>();
  const [message, setMessage] = useState('');
  const [countUnread, setCountUnread] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [isSentOrderId, setIsSentOrderId] = useState(false);
  const [isShowPhone, setIsShowPhone] = useState(false);
  // const [isSocketInitializing, setIsSocketInitializing] = useState(true);
  const refreshCount = useRef(0);

  const conversationDetail = useSelector(getConversationDetailState(roomInfo?.id || NaN));

  // order by Timestamp: DESC
  const messageKeyList = useMemo(() => {
    const messages = conversationDetail?.messages;
    return messages && Object.keys(messages).sort((a, b) => Number(b) - Number(a));
  }, [conversationDetail?.messages]);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current && socketRef.current.disconnect) {
      socketRef.current.disconnect();
    }
  }, []);

  const onChange = useCallback((event) => {
    setMessage(event.currentTarget.value);
  }, []);

  const debouncedSend = useMemo(
    () =>
      debounce(
        (message) => {
          if (roomInfo && message && message !== '') {
            const msg = {
              content: message,
              contentType: 'text',
              roomId: roomInfo.id,
              fromUser: roomInfo.fromUser,
              toUser: roomInfo.toUser,
            };
            socketRef.current.emit('send_message', msg);
            setMessage('');
          }
        },
        500,
        { leading: true, trailing: false }
      ),
    [roomInfo]
  );

  const sendMessage = useCallback(() => {
    debouncedSend(message);
  }, [debouncedSend, message]);

  useEffect(() => {
    if (isConnected) {
      if (socketRef.current && socketRef.current.emit) {
        socketRef.current.emit('join_room', {
          from: {
            mobilePhone: fromUserPhone,
            role: fromUserRole,
          },
          to: {
            mobilePhone: toUserPhone,
            role: toUserRole,
          },
          // roomId: 0
        });
      }
    }
  }, [fromUserPhone, fromUserRole, isConnected, toUserPhone, toUserRole]);

  useEffect(() => {
    if (token && token !== '') {
      const socketOptions = {
        transports: ['websocket'],
        query: {
          Authorization: token, //token
        },
      };
      socketRef.current = io(socketGatewayHost, socketOptions);

      socketRef.current.on('connected', (data) => {
        socketRef.current.emit('register_device', {
          mobilePhone: fromUserPhone,
          userName: fromUserName,
          roleId: fromUserRole,
        });
      });

      socketRef.current.on('connect', (data) => {
        if (socketRef.current.connected) {
          setAlertMessage('');
        }
      });

      socketRef.current.on('disconnect', (data) => {
        // console.log("disconnect", data.message);
      });

      socketRef.current.on('connect_error', (data) => {
        setAlertMessage(t('conversation.youreOffline') as string);
      });

      socketRef.current.on('connect_failed', (data) => {
        setAlertMessage(t('conversation.youreOffline') as string);
      });

      socketRef.current.on('exception', (data) => {
        if (data.message === 'Forbidden resource') {
          if (refreshToken && refreshCount.current < 5) {
            refreshCount.current = refreshCount.current + 1;
            dispatch(
              sessionActions.doRefreshToken({
                token: token,
                refreshToken: refreshToken,
              })
            );
          }
        } else {
          setAlertMessage(data.message);
        }
      });

      //Done register device
      socketRef.current.on('register_device_response', (response) => {
        if (response.success) {
          setIsConnected(true);
        } else {
          setAlertMessage(t('conversation.connectionIssue') as string);
        }
      });

      //get room conversation info and join in
      socketRef.current.on('room', (room: Room) => {
        setRoomInfo(room);
        if (room.message === 'Cannot create room: input invalid') {
          setAlertMessage(t('conversation.connectionIssue') as string);
        } else {
          dispatch(
            conversationActions.loadMessageList({
              mobilePhone: fromUserPhone,
              token: token,
              roomId: room.id,
            })
          );
          setCountUnread('0');
        }
      });

      socketRef.current.on('receive_message', (messages) => {
        const newMessage: MessageItem = {
          content: messages.content,
          contentType: messages.contentType || 'text',
          createdAt: messages.createdAt,
          isRead: false,
          mobilePhone: messages.fromUser.mobilePhone,
          roleId: messages.fromUser.roleId,
          userName: messages.fromUser.userName,
          roomId: messages.roomId,
          userId: messages.fromUser.id,
        };
        dispatch(conversationActions.addMessageList(newMessage));
      });
    }
    return () => {
      disconnectSocket();
    };
  }, [
    conversationActions,
    disconnectSocket,
    dispatch,
    fromUserName,
    fromUserPhone,
    fromUserRole,
    messageContent,
    refreshToken,
    sessionActions,
    t,
    token,
  ]);

  // useEffect(() => {
  //   if (roomInfo && !isSentOrderId) {
  //     if (messageContent ) {
  //       const lastMessage = conversationDetail?.messages[messageKeyList[0]];
  //       if (
  //         !lastMessage ||
  //         lastMessage.contentType !== 'order' ||
  //         (lastMessage.contentType === 'order' && lastMessage.content !== `${orderId}`)
  //       ) {
  //         socketRef.current.emit('send_message', {
  //           content: `${orderId}`,
  //           contentType: 'order',
  //           roomId: roomInfo.id,
  //           fromUser: roomInfo.fromUser,
  //           toUser: roomInfo.toUser,
  //         });
  //       }
  //       setIsSentOrderId(true);
  //     }
  //   }
  // }, [conversationDetail?.messages, isSentOrderId, messageKeyList, orderId, roomInfo]);

  useEffect(() => {
    dispatch(
      sessionActions.updateCountUnreadRoom({
        roomId: roomId,
        countUnread: countUnread,
      })
    );
  }, [countUnread, dispatch, roomId, sessionActions]);

  const onClickPhone = useCallback(
    (event) => {
      if (!isMobileView(width)) {
        event.preventDefault();
        setIsShowPhone(true);
      }
    },
    [width]
  );

  return (
    <>
      {token ? (
        <ConversationContainer>
          <MessageWrapper>
            <Header
              message={alertMessage}
              onClose={onClose}
              toPhone={toUserPhone}
              onClickPhone={onClickPhone}
            />
            {!roomInfo && (
              <LoadingWrapper>
                <PLoadingIndicator />
              </LoadingWrapper>
            )}
            <MessageList
              messages={conversationDetail?.messages}
              messageKeyList={messageKeyList}
              fromUserPhone={fromUserPhone}
              fromUserRole={fromUserRole}
              roomId={roomInfo?.id}
            />
            <MessageInput message={message} sendMessage={sendMessage} onChange={onChange} />
          </MessageWrapper>
          {!isMobileView(width) && (
            <OutletPhoneModal
              isShow={isShowPhone}
              phone={toUserPhone}
              onClose={() => {
                setIsShowPhone(false);
              }}
            />
          )}
        </ConversationContainer>
      ) : (
        <></>
      )}
    </>
  );
};
