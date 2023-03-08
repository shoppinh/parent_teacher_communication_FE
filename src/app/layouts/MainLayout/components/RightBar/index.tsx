import { PModal } from 'app/components/PModal';
import { Conversation } from 'app/pages/Conversation';
import AvatarPlaceholder from 'assets/images/person-placeholder.png';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConversationList,
  getCurrentRoomId,
  getCurrentToUser,
} from 'store/selectors/conversation';
import { getAccessToken, getRefreshToken, getUser } from 'store/selectors/session';
import { useConversationSlice } from 'store/slices/conversation';
import { styled } from 'twin.macro';
import { ConversationListQuery } from 'types/Conversation';
import { ConstantRoles } from 'utils/constants';
import { mapStringRoleToNumber } from 'utils/helpers';
import { media } from '../../../../../styles';
import { StyleConstants } from '../../../../../styles/constants/style';
import { pxToRem } from '../../../../../styles/theme/utils';
import { PButton } from '../../../../components/PButton';

const Container = styled.div`
  width: ${pxToRem(StyleConstants.LEFT_BAR_WIDTH)}rem;
  background-color: ${(p) => p.theme.background};
  border-left: 1px solid ${(p) => p.theme.borderLight};
  display: none;
  ${media.md`
    display: block;
  `}
`;
const MessageList = styled.div`
  display: flex;
  flex-direction: column;
`;
const MessageItem = styled.div`
  padding: ${pxToRem(15)}rem;
  display: flex;
  cursor: pointer;
  &:hover {
    background-color: ${(p) => p.theme.contrastBackground};
  }
`;
const Avatar = styled.img`
  background-image: url(${AvatarPlaceholder});
  background-size: cover;
  background-position: center center;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  margin-right: ${pxToRem(12)}rem;
`;
const MessageTo = styled.p`
  font-size: ${pxToRem(16)}rem;
  font-weight: bold;
`;
const MessageContent = styled.p`
  font-size: ${pxToRem(14)}rem;
  color: ${(p) => p.theme.placeholder};
`;
const MessageContentWrapper = styled.div``;
const StyledButton = styled(PButton)`
  padding: ${pxToRem(10)}rem ${pxToRem(20)}rem;
  margin: ${pxToRem(5)}rem ${pxToRem(10)}rem ${pxToRem(5)}rem 0;
  border-radius: ${pxToRem(20)}rem;
  font-weight: 700;
`;
const ButtonWrapper = styled.div`
  text-align: right;
  border-bottom: 1px solid ${(p) => p.theme.borderLight};
`;
interface MessageProp {
  handleOpenConversation: () => void;
}

const Message: React.FC<MessageProp> = ({ handleOpenConversation }) => {
  return (
    <MessageItem onClick={handleOpenConversation}>
      <Avatar />
      <MessageContentWrapper>
        <MessageTo>Junior KienneiK</MessageTo>
        <MessageContent>You are sexy</MessageContent>
      </MessageContentWrapper>
    </MessageItem>
  );
};
const RightBar = () => {
  const [showConversation, setShowConversation] = useState(false);
  const { actions: conversationActions } = useConversationSlice();
  const currentAccessToken = useSelector(getAccessToken);
  const currentRefreshToken = useSelector(getRefreshToken);
  const currentUser = useSelector(getUser);
  const currentUserConversationList = useSelector(getConversationList);
  const dispatch = useDispatch();
  const handleCloseConversation = () => {
    setShowConversation(false);
  };
  const conversationToUserData = useSelector(getCurrentToUser) || {
    roleId: 1,
    mobilePhone: '0397273869',
    userName: 'Admin',
  };
  const currentRoomId = useSelector(getCurrentRoomId) || NaN;
  const handleOpenConversation = useCallback(
    (toUserRole: string, toUserPhone: string, toUserId: string, roomId: number) => {
      setShowConversation(true);
      dispatch(
        conversationActions.updateToCurrentUser({
          roleId: toUserRole,
          mobilePhone: toUserPhone,
          _id: toUserId,
        })
      );
      dispatch(conversationActions.updateCurrentRoomId(roomId));
    },
    [conversationActions, dispatch]
  );
  const handleNewMessage = useCallback(() => {
    setShowConversation(true);
    dispatch(
      conversationActions.updateToCurrentUser({
        roleId: '2',
        mobilePhone: '0397273812',
        _id: 'admin',
      })
    );
  }, [conversationActions, dispatch]);
  useEffect(() => {
    if (currentAccessToken) {
      const payload: ConversationListQuery = {
        mobilePhone: currentUser?.mobilePhone || '',
        roleId: mapStringRoleToNumber(currentUser?.roleId).toString() || '',
        token: currentAccessToken,
      };
      dispatch(conversationActions.loadConversationList(payload));
    }
  }, [
    conversationActions,
    currentAccessToken,
    currentUser?.mobilePhone,
    currentUser?.roleId,
    dispatch,
  ]);
  return (
    <Container>
      <ButtonWrapper>
        <StyledButton onClick={handleNewMessage} variant='primary'>
          New Message
        </StyledButton>
      </ButtonWrapper>
      <MessageList>
        {currentUserConversationList &&
          Object.values(currentUserConversationList).map((conversation) => {
            return (
              <Message
                handleOpenConversation={() =>
                  handleOpenConversation(
                    conversation.toRoleId.toString(),
                    conversation.toMobilePhone,
                    conversation.toUserUniqueId,
                    conversation.roomId
                  )
                }
                key={conversation.id}
              />
            );
          })}
      </MessageList>
      <PModal open={showConversation} onClose={handleCloseConversation}>
        <Conversation
          roomId={currentRoomId}
          token={currentAccessToken}
          refreshToken={currentRefreshToken}
          fromUserPhone={currentUser?.mobilePhone || ''}
          fromUserName={currentUser?.username}
          toUserPhone={conversationToUserData?.mobilePhone || '0397273869'}
          fromUserRole={mapStringRoleToNumber(currentUser?.roleId)}
          toUserRole={
            conversationToUserData?.roleId ? parseInt(conversationToUserData?.roleId.toString()) : 1
          }
          onClose={() => {
            setShowConversation(false);
          }}
        />
      </PModal>
    </Container>
  );
};

export default RightBar;
