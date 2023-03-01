export interface ConversationDetailQuery {
  token: string;
  mobilePhone: string;
  roomId: string;
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
  roomId: string;
  countUnread: string;
  roleId?: number;
  userId?: number;
}

export interface ConversationMesssages {
  messages: MessageItem[];
  mobilePhone: string;
  roomId: string;
}

export interface MessageItem {
  content: string;
  contentType: string;
  createdAt: Date;
  id?: number;
  isRead: boolean;
  mobilePhone: string;
  roomId: string;
  updatedAt?: Date;
  userId: number;
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
  currentRoomId?: string;
  loading: boolean;
  error: any;
}

export interface ConversationError {
  code: ConversationErrorType | null;
  message?: string;
}

export enum ConversationErrorType {
  RESPONSE_ERROR = 400,
}
