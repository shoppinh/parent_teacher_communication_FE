import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import {ConversationDetailQuery, ConversationRoomQuery, PushNotificationQuery} from 'types/Conversation';

const messageGatewayHost = process.env.REACT_APP_API_CONVERSATION_URL || '';

export const getConversationDetail = async (query: ConversationDetailQuery) => {
  const endPoint = `${messageGatewayHost}${APIs.message.getConversationDetail.replace(
    '{roomId}',
    `${query.roomId}`
  )}`;
  return new apiClient(query.token).get(endPoint);
};

export const getCountUnreadRoom = async (query: ConversationRoomQuery) => {
  const replaceQuery = APIs.message.getConversationUnreadRoom.replace(
    '{fromMobilePhone}/{fromRoleId}/{toMobilePhone}/{toRoleId}',
    `${query.fromMobilePhone}/${query.fromRoleId}/${query.toMobilePhone}/${query.toRoleId}`
  );
  const endPoint = `${messageGatewayHost}${replaceQuery}`;
  return new apiClient(query.token).get(endPoint);
};

export const sendPushNotification = async (query: PushNotificationQuery) => {
  return new apiClient('').post(APIs.message.sendPushNotification, query);
}
