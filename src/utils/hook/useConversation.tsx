import { useCallback, useState } from 'react';
import { ConversationListQuery, NewConversationPayload } from '../../types/Conversation';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, getRefreshToken, getUser } from '../../store/selectors/session';
import { useConversationSlice } from '../../store/slices/conversation';
import { mapStringRoleToNumber } from '../helpers';
import { getCurrentRoomId, getCurrentToUser } from '../../store/selectors/conversation';

export const useConversation = () => {
  const [showConversation, setShowConversation] = useState(false);
  const currentUser = useSelector(getUser);
  const currentAccessToken = useSelector(getAccessToken);
  const currentRefreshToken = useSelector(getRefreshToken);
  const dispatch = useDispatch();
  const { actions: conversationActions } = useConversationSlice();
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
  const handleOpenNewConversation = useCallback(
    (newConversationPayload: NewConversationPayload) => {
      setShowConversation(true);
      dispatch(conversationActions.updateToCurrentUser(newConversationPayload));
    },
    [conversationActions, dispatch]
  );
  const handleCloseConversation = useCallback(() => {
    setShowConversation(false);
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
  return {
    handleOpenConversation,
    handleOpenNewConversation,
    showConversation,
    handleCloseConversation,
    currentRefreshToken,
    currentUser,
    currentAccessToken,
    setShowConversation,
    conversationToUserData,
    currentRoomId,
  };
};
