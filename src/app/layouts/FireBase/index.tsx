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
import { isMobileView, mapNumberRoleToString } from 'utils/helpers';

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

  const roomId = queryRoomId ? parseInt(queryRoomId) : currentRoomId;
  const countUnreadMessage = useSelector(getSessionCountUnread(roomId || NaN));

  const [hasDeviceToken, setHasDeviceToken] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    type: '',
    body: '',
    mobilePhone: '',
    fromUserId: '',
    roleId: NaN,
    userName: '',
    roomId: NaN,
  });

  useEffect(() => {
    let isMount = true;
    if (currentAccessToken && !hasDeviceToken) {
      const onSetHasDeviceToken = (value) => {
        if (isMount) setHasDeviceToken(value);
      };
      getDeviceToken(onSetHasDeviceToken).then((token) => {
        if (token !== fcmToken) {
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
  }, [currentAccessToken, currentUser?._id, dispatch, fcmToken, hasDeviceToken, sessionActions]);

  onMessageListener()
    .then((payload) => {
      if (isMobileView(width)) {
        setShowNotification(true);
        setNotification({
          type: payload.data.type,
          body: payload.notification?.body || payload.data?.body,
          mobilePhone: payload.data.mobilePhone,
          roleId: payload.data.roleId,
          roomId: payload.data.roomId,
          userName: payload.data.userName,
          fromUserId: payload.data.fromUserId,
        });
      } else {
        toast.dismiss();
        toast.info(
          <PNotification
            type={payload.data.type}
            body={payload.notification?.body || payload.data?.body}
            mobilePhone={payload.data.mobilePhone}
            roleId={mapNumberRoleToString(payload.data.roleId)}
            roomId={payload.data.roomId}
            userName={payload.data.userName}
            fromUserId={payload.data.fromUserId}
          />,
          dialogOption.notified
        );
        setShowNotification(!showNotification);
      }
      if (payload.data.type === 'TWO_WAY_MESSAGING_TYPE') {
        dispatch(
          sessionActions.updateCountUnreadRoom({
            roomId: payload.data.roomId || NaN,
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
          <PNotification
            type={notification.type}
            body={notification.body}
            mobilePhone={notification.mobilePhone}
            roleId={mapNumberRoleToString(notification.roleId)}
            roomId={notification.roomId}
            userName={notification.userName}
            fromUserId={notification.fromUserId}
          />
        </PModal>
      )}
    </>
  );
};
