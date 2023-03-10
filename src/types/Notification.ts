export interface NotificationPayload {
  notification: Notification;
  data: Data;
}

export interface Notification {
  title: string;
  body: string;
}

export interface Data {
  type: string;
  mobilePhone: string;
  orderId: string;
  orderStatus: string;
  previousOrderStatus: string;
  roleId: number;
  roomId: number;
  userName: string;
  menuGUID: string;
  fromUserId: string;
  body: string;
}
