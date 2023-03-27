import { PModal } from 'app/components/PModal';
import { Conversation } from 'app/pages/Conversation';
import AvatarPlaceholder from 'assets/images/person-placeholder.png';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getConversationList,
  getCurrentRoomId,
  getCurrentToUser,
} from 'store/selectors/conversation';
import { getAccessToken, getRefreshToken, getUser } from 'store/selectors/session';
import { useConversationSlice } from 'store/slices/conversation';
import tw, { styled } from 'twin.macro';
import { ConversationListQuery, NewConversationPayload } from 'types/Conversation';
import { AdminContact } from 'utils/constants';
import { mapNumberRoleToString, mapStringRoleToNumber } from 'utils/helpers';
import { media } from '../../../../../styles';
import { StyleConstants } from '../../../../../styles/constants/style';
import { pxToRem } from '../../../../../styles/theme/utils';
import { PButton } from '../../../../components/PButton';
import { Conversation as ConversationType } from '../../../../../types/Conversation';
import {
  TabPanelUnstyled,
  TabsListUnstyled,
  TabsUnstyled,
  TabUnstyled,
  tabUnstyledClasses,
} from '@mui/base';
import { getUserList } from '../../../../../store/selectors/config';
import { useTranslation } from 'react-i18next';
import { User } from '../../../../../types/User';

const Container = styled.div`
  width: ${pxToRem(StyleConstants.LEFT_BAR_WIDTH)}rem;
  background-color: ${(p) => p.theme.background};
  border-left: 1px solid ${(p) => p.theme.borderLight};
  display: none;
  ${media.md`
    display: block;
  `}
`;
const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  overflow-y: auto;
`;
const MessageItem = styled.div`
  padding: ${pxToRem(15)}rem;
  display: flex;
  cursor: pointer;
  position: relative;
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
  border-bottom: 1px solid ${(p) => p.theme.borderLight};
  height: ${pxToRem(StyleConstants.TAB_HEIGHT)}rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const UnreadCount = styled.div`
  width: ${pxToRem(20)}rem;
  height: ${pxToRem(20)}rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${(p) => p.theme.danger};
  color: ${(p) => p.theme.background};
  position: absolute;
  top: ${pxToRem(10)}rem;
  right: ${pxToRem(10)}rem;
`;
const StyledTabsList = styled(TabsListUnstyled)``;
const StyledTab = styled(TabUnstyled)`
  ${tw`p-2`}
  color: ${(p) => p.theme.placeholder};
  font-weight: bold;
  font-size: ${pxToRem(16)}rem;

  &.${tabUnstyledClasses.selected} {
    color: ${(p) => p.theme.text};
    border-bottom: 3px solid ${(p) => p.theme.backgroundVariant};
  }
`;
const TabsWrapper = styled.div`
  display: flex;
  ${tw`p-2`}
  justify-content: space-between;
  height: ${pxToRem(StyleConstants.TAB_HEIGHT)}rem;
  background-color: ${(p) => p.theme.background};
`;

const TabPaneContent = styled.div`
  ${tw`p-3`}
`;
const StyledTabs = styled(TabsUnstyled)`
  height: calc(100% - ${pxToRem(StyleConstants.TAB_HEIGHT)}rem);
  overflow-y: auto;
`;
interface MessageProp {
  handleOpenConversation: (
    toUserRole: string,
    toUserPhone: string,
    toUserId: string,
    roomId: number
  ) => void;
  data: ConversationType;
}

interface UserItemProp {
  handleOpenConversation: (data: NewConversationPayload) => void;
  data: User;
}

const Message: React.FC<MessageProp> = ({ handleOpenConversation = () => {}, data }) => {
  const { t } = useTranslation();
  return (
    <MessageItem
      onClick={() =>
        handleOpenConversation(
          data.toRoleId.toString(),
          data.toMobilePhone,
          data.toUserUniqueId,
          data.roomId
        )
      }
    >
      <Avatar />
      <MessageContentWrapper>
        <MessageTo>{`${data.toUserName} (${t(
          `role.${mapNumberRoleToString(data.toRoleId)}`
        )})`}</MessageTo>
        <MessageContent>{data.latestMessage}</MessageContent>
      </MessageContentWrapper>
      {data.countUnread > 0 && <UnreadCount>{data.countUnread}</UnreadCount>}
    </MessageItem>
  );
};
const UserItem: React.FC<UserItemProp> = ({ handleOpenConversation = () => {}, data }) => {
  const { t } = useTranslation();
  return (
    <MessageItem
      onClick={() =>
        handleOpenConversation({
          roleId: mapStringRoleToNumber(data.roleId).toString(),
          mobilePhone: data.mobilePhone,
          _id: data._id,
        })
      }
    >
      <Avatar src={data.avatar} />
      <MessageContentWrapper>
        <MessageTo>
          {data.firstname && data.lastname
            ? `${data.firstname} ${data.lastname} (${t(`role.${data.roleId}`)})`
            : `${data.username} (${t(`role.${data.roleId}`)})`}
        </MessageTo>
      </MessageContentWrapper>
    </MessageItem>
  );
};
interface RighBarProps {
  handleOpenNewConversation: (newConversationPayload: NewConversationPayload) => void;
  handleOpenConversation: (
    toUserRole: string,
    toUserPhone: string,
    toUserId: string,
    roomId: number
  ) => void;
}
const RightBar: React.FC<RighBarProps> = ({
  handleOpenConversation,
  handleOpenNewConversation,
}) => {
  const { t } = useTranslation();
  const { actions: conversationActions } = useConversationSlice();
  const currentAccessToken = useSelector(getAccessToken);
  const currentRefreshToken = useSelector(getRefreshToken);
  const currentUser = useSelector(getUser);
  const currentUserConversationList = useSelector(getConversationList);
  const dispatch = useDispatch();

  const userList = useSelector(getUserList);

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
        <StyledButton onClick={() => handleOpenNewConversation(AdminContact)} variant='primary'>
          {t('common.contactAdmin')}
        </StyledButton>
      </ButtonWrapper>

      <StyledTabs defaultValue={0}>
        <TabsWrapper>
          <StyledTabsList>
            <StyledTab>{t('tab.message')}</StyledTab>
            <StyledTab>{t('tab.user')}</StyledTab>
          </StyledTabsList>
        </TabsWrapper>
        <TabPaneContent>
          <TabPanelUnstyled value={0}>
            <ItemList>
              {currentUserConversationList &&
                Object.values(currentUserConversationList).map((conversation) => {
                  return (
                    <Message
                      handleOpenConversation={handleOpenConversation}
                      key={conversation.id}
                      data={conversation}
                    />
                  );
                })}
            </ItemList>
          </TabPanelUnstyled>
          <TabPanelUnstyled value={1}>
            <ItemList>
              {userList &&
                userList
                  .filter((item) => item._id !== currentUser?._id)
                  .map((user) => (
                    <UserItem
                      data={user}
                      handleOpenConversation={handleOpenNewConversation}
                      key={user._id}
                    />
                  ))}
            </ItemList>
          </TabPanelUnstyled>
        </TabPaneContent>
      </StyledTabs>

      {/*<PModal open={showNewMessageModal} onClose={() => setShowNewMessageModal(false)}>*/}
      {/*  <NewMessageModal onClose={() => setShowNewMessageModal(false)} />*/}
      {/*</PModal>*/}
    </Container>
  );
};

export default RightBar;
