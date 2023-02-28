import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import {
  ConversationDetailQuery,
  ConversationError,
  ConversationMesssages,
  ConversationState,
  MessageItem,
} from 'types/Conversation';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { conversationSaga } from 'store/sagas/conversationSaga';

const conversationCache = loadState()?.conversation;

export const initialState: ConversationState = {
  data: { ...conversationCache?.data },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    loadMessageList(state, action: PayloadAction<ConversationDetailQuery>) {
      state.error = null;
      state.loading = true;
    },
    loadedMessageList(state, action: PayloadAction<ConversationMesssages>) {
      if (action?.payload.roomId ) {
        state.data = {
          ...state.data,
          ...{
            [action?.payload.roomId]: {
              messages: action?.payload.messages.reduce((prev, curr) => {
                const createTimestamp = Date.parse(new Date(curr.createdAt).toISOString());
                return {
                  ...prev,
                  [createTimestamp]: curr,
                };
              }, {}),
              // message: action?.payload.messages
            },
          },
        };
      }
      state.loading = false;
    },
    // getCountUnreadRoom(state, action?: PayloadAction<ConversationRoomQuery>) {
    //   state.error = null;
    //   state.loading = true;
    // },
    // updateCountUnreadRoom(state, action?: PayloadAction<ConversationUnreadPayload>) {
    //   state.error = null;
    //   if(action?.payload.roomId && !isNaN(action?.payload.roomId)) {
    //     state.data = {
    //       ...state.data,
    //       ...{
    //         [action?.payload.roomId]: {
    //           ...state.data[action?.payload.roomId],
    //           countUnread: Number(action?.payload.countUnread || "0") ,
    //           // message: action?.payload.messages
    //         }
    //       }
    //     };
    //   }
    //   state.loading = false;
    // },
    addMessageList(state, action?: PayloadAction<MessageItem>) {
      if (action?.payload.roomId ) {
        const createTimestamp = Date.parse(new Date(action?.payload.createdAt).toISOString());
        state.data = {
          ...state.data,
          ...{
            [action?.payload.roomId]: {
              messages: {
                ...(state.data[action?.payload.roomId]
                  ? state.data[action?.payload.roomId].messages
                  : {}),
                [createTimestamp]: action?.payload,
              },
              // message: action?.payload.messages
            },
          },
        };
      }
    },
    Error(state, action: PayloadAction<ConversationError>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { name, actions: conversationActions, reducer } = slice;

export const useConversationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: conversationSaga });
  return {
    actions: slice.actions,
  };
};
