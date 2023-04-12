import { User } from './User';
import { ConstantRolesNumber } from '../utils/constants';

export interface ConversationDetailQuery {
  token: string;
  mobilePhone: string;
  roomId: number;
}

export interface PushNotificationQuery {
  token: string;
  data: {
    [key: string]: string;
  };
  body: {
    title?: string;
    body?: string;
    imageUrl?: string;
  };
}

export interface ConversationRoomQuery {
  token: string;
  fromMobilePhone: string;
  fromRoleId: number;
  toMobilePhone: string;
  toRoleId: number;
}

export interface ConversationUnreadPayload {
  roomId: number;
  countUnread: string;
  roleId?: number;
  userId?: number;
}

export interface ConversationMesssages {
  messages: MessageItem[];
  mobilePhone: string;
  roomId: number;
}

export interface ConversationListQuery {
  mobilePhone: string;
  roleId: string;
  token: string;
  offset?: number;
  limit?: number;
  orderBy?: string;
  orderDesc?: string;
}

export interface MessageItem {
  content: string;
  contentType: string;
  createdAt: Date;
  id?: string;
  isRead: boolean;
  mobilePhone: string;
  roomId: number;
  updatedAt?: Date;
  userId: string;
  userName: string;
  roleId: number;
}

export interface Messages {
  [key: string]: MessageItem;
}

export interface ConversationState {
  data: {
    [key: number]: {
      messages: Messages;
      countUnread?: number;
    };
  };
  conversationList?: {
    [key: number]: Conversation;
  };
  currentRoomId?: number;
  currentToUser?: User;
  loading: boolean;
  error: any;
}

export interface Conversation {
  fromUserName: string;
  fromFullName: string;
  fromMobilePhone: string;
  fromRoleId: number;
  fromUserUniqueId: string;
  toUserName: string;
  toFullName: string;
  toMobilePhone: string;
  toRoleId: number;
  toUserUniqueId: string;
  lastTimeMessage: string;
  latestMessage: string;
  latestMessageContentType: string;
  id: number;
  roomId: number;
  userId: number;
  latestMessageId: number;
  countUnread: number;
  role: number;
  toUserId: number;
}

export interface ConversationError {
  code: ConversationErrorType | null;
  message?: string;
}
export enum ConversationErrorType {
  RESPONSE_ERROR = 400,
}

export interface NewConversationPayload {
  roleId: string;
  mobilePhone: string;
  _id: string;
}
