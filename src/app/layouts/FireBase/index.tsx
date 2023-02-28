import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  getAccessToken,
  getFcmToken,
  getSessionCountUnread,
  getUser,
} from 'store/selectors/session';
import { useSessionSlice } from 'store/slices/session';
import { dialogOption, queryString } from 'utils/constants';
import { getDeviceToken, onMessageListener } from 'utils/firebase/firebase';
import { isMobileView } from 'utils/helpers';

import { PModal } from '../../components/PModal';
import { getCurrentRoomId } from '../../../store/selectors/conversation';
import PNotification from '../../components/PNotification';
import { useQuery, useWindowSize } from '../../../utils/hook';

export const Firebase = () => {
  const dispatch = useDispatch();
  const { actions: sessionActions } = useSessionSlice();

  const query = useQuery();
  const queryRoomId = query.get(queryString.roomId);

  const currentRoomId = useSelector(getCurrentRoomId);

  const currentAccessToken = useSelector(getAccessToken);
  const fcmToken = useSelector(getFcmToken);
  const currentUser = useSelector(getUser);

  const { width } = useWindowSize();

  const roomId = queryRoomId ? queryRoomId : currentRoomId;
  const countUnreadMessage = useSelector(getSessionCountUnread(roomId || ''));

  const [hasDeviceToken, setHasDeviceToken] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    type: '',
    body: '',
    phone: '',
    orderId: '',
    orderStatus: '',
    previousOrderStatus: '',
    mobilePhone: '',
    menuGUID: '',
    fromUserId: '',
    roleId: '',
    userName: '',
    roomId: '',
  });

  useEffect(() => {
    let isMount = true;
    if (currentAccessToken && !hasDeviceToken) {
      const onSetHasDeviceToken = (value) => {
        if (isMount) setHasDeviceToken(value);
      };
      getDeviceToken(onSetHasDeviceToken).then((token) => {
        console.log('token', token);
        console.log('fcmToken', fcmToken);

        if (token !== fcmToken) {
          console.log("true");
          dispatch(
            sessionActions.doRegisterDeviceToken({
              fcmToken: `${token}`,
              oldFcmToken: fcmToken || '',
              userId: currentUser?._id || '',
              token: currentAccessToken || '',
            })
          );
        }
      });
    }
    return () => {
      isMount = false;
    };
  }, [
    currentAccessToken,
    currentUser?._id,
    dispatch,
    fcmToken,
    hasDeviceToken,
    setHasDeviceToken,
    sessionActions,
  ]);

  onMessageListener()
    .then((payload) => {
      // console.log(`Notification received: ${JSON.stringify(payload)}`);
      if (isMobileView(width)) {
        setShowNotification(true);
        setNotification({
          type: payload.data.type,
          body: payload.notification?.body || payload.data?.body,
          phone: payload.data.mobilePhone,
          orderId: payload.data.orderId,
          orderStatus: payload.data.orderStatus,
          previousOrderStatus: payload.data.previousOrderStatus,
          mobilePhone: payload.data.mobilePhone,
          roleId: payload.data.roleId,
          roomId: payload.data.roomId,
          userName: payload.data.userName,
          fromUserId: payload.data.fromUserId,
          menuGUID: payload.data.menuGUID,
        });
      } else {
        toast.dismiss();
        // toast.info(
        //   <Notification
        //     type={payload.data.type}
        //     body={payload.notification?.body || payload.data?.body}
        //     phone={payload.data.mobilePhone}
        //     orderId={payload.data.orderId}
        //     orderStatus={payload.data.orderStatus}
        //     previousOrderStatus={payload.data.previousOrderStatus}
        //     mobilePhone={payload.data.mobilePhone}
        //     roleId={payload.data.roleId}
        //     roomId={payload.data.roomId}
        //     userName={payload.data.userName}
        //     menuGUID={payload.data.menuGUID}
        //     fromUserId={payload.data.fromUserId}
        //   />,
        //   dialogOption.notified
        // );
        toast.info(<PNotification />, dialogOption.notified);
      }
      if (payload.data.type === 'TWO_WAY_MESSAGING_TYPE') {
        dispatch(
          sessionActions.updateCountUnreadRoom({
            roomId: payload.data.roomId || '',
            countUnread: `${(countUnreadMessage?.messageCountUnread || 0) + 1}`,
          })
        );
      }
    })
    .catch((err) => console.log('Notification failed: ', err));

  const onCloseNotification = useCallback(() => {
    setShowNotification(false);
  }, []);

  return (
    <>
      {hasDeviceToken && isMobileView(width) && (
        <PModal open={showNotification} onClose={onCloseNotification}>
          {/*<Notification*/}
          {/*  type={notification.type}*/}
          {/*  body={notification.body}*/}
          {/*  phone={notification.phone}*/}
          {/*  orderId={notification.orderId}*/}
          {/*  orderStatus={notification.orderStatus}*/}
          {/*  previousOrderStatus={notification.previousOrderStatus}*/}
          {/*  mobilePhone={notification.mobilePhone}*/}
          {/*  roleId={notification.roleId}*/}
          {/*  roomId={notification.roomId}*/}
          {/*  userName={notification.userName}*/}
          {/*  menuGUID={notification.menuGUID}*/}
          {/*  fromUserId={notification.fromUserId}*/}
          {/*/>*/}
          <PNotification />
        </PModal>
      )}
    </>
  );
};
