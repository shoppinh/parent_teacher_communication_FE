import { PayloadAction } from '@reduxjs/toolkit';
import { loadDocumentCookieState } from 'store/cookieHandle';
import { loadState } from 'store/localStorage';
import { sessionSaga } from 'store/sagas/sessionSaga';
// import { sessionSaga } from 'store/sagas';
import { ConversationRoomQuery, ConversationUnreadPayload } from 'types/Conversation';
import {
  AuthPayLoad,
  AuthQuery,
  AuthUserPayload,
  LogoutQuery,
  RefreshTokenQuery,
  SessionError,
  SessionState,
} from 'types/Session';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { DeviceTokenQuery } from '../../types/Register';

const sessionCache = loadState()?.session;
const authCache =
  sessionCache?.data?.auth && sessionCache?.data?.auth.rememberMe
    ? sessionCache?.data?.auth
    : loadDocumentCookieState()?.auth;

export const initialState: SessionState = {
  data: {
    ...sessionCache?.data,
    auth: authCache,
  },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    updateAuth(state, action: PayloadAction<AuthPayLoad>) {
      state.data = {
        ...state.data,
        auth: {
          ...state.data.auth,
          ...action.payload,
        },
      };
      state.loading = false;
    },
    doLogin(state, action: PayloadAction<AuthQuery>) {
      state.error = null;
      state.data.auth = { isLogout: false };
      state.loading = true;
    },
    doAdminLogin(state, action: PayloadAction<AuthQuery>) {
      state.error = null;
      state.data.auth = { isLogout: false };
      state.loading = true;
    },
    doRefreshToken(state, action: PayloadAction<RefreshTokenQuery>) {
      state.error = null;
      // state.data.auth = initialState.data.auth || {};
      state.loading = true;
    },
    doLogout(state, action: PayloadAction<LogoutQuery>) {
      state.error = null;
      state.data.auth = {
        isLogout: true,
      };
      state.loading = false;
    },
    doGetUserInfo(state, action: PayloadAction<AuthQuery>) {
      state.error = null;
      state.loading = true;
    },
    updateUserInfo(state, action: PayloadAction<AuthUserPayload>) {
      state.error = null;
      state.data.auth = {
        ...state.data.auth,
        user: {
          ...state.data.auth?.user,
          data: action.payload.user,
        },
      };
      state.loading = true;
    },

    doRegisterDeviceToken(state, action: PayloadAction<DeviceTokenQuery>) {},
    updateRegisterDeviceToken(state, action: PayloadAction<DeviceTokenQuery>) {
      state.data.auth = {
        ...state.data.auth,
        fcmToken: action.payload.fcmToken,
      };
    },
    getCountUnreadRoom(state, action?: PayloadAction<ConversationRoomQuery>) {
      state.error = null;
      state.loading = true;
    },
    updateCountUnreadRoom(state, action: PayloadAction<ConversationUnreadPayload>) {
      if (action?.payload.roomId) {
        state.error = null;
        state.data.auth = {
          ...state.data.auth,
          user: {
            ...state.data.auth?.user,
            notifications: {
              ...state.data.auth?.user?.notifications,
              [action.payload.roomId]: {
                messageCountUnread: Number(action.payload.countUnread || '0'),
              },
            },
          },
        };
      }
      state.loading = false;
    },
    Error(state, action: PayloadAction<SessionError>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { name, actions: sessionActions, reducer } = slice;

export const useSessionSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: sessionSaga });
  return {
    actions: sessionActions,
  };
};
