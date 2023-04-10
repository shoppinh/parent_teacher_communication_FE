import { PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { eventSaga } from 'store/sagas/eventSaga';
import { Event, EventError, EventListQuery, EventListResponse, EventState } from 'types/Event';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

const eventCache = loadState()?.event;

export const initialState: EventState = {
  data: {
    ...eventCache?.data,
  },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    loadEventList(state, _action: PayloadAction<EventListQuery>) {
      state.loading = true;
      state.error = null;
    },
    loadedEventList(state, action: PayloadAction<EventListResponse>) {
      state.loading = false;
      state.data = action.payload;
    },
    Error(state, action: PayloadAction<EventError>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { name, actions: eventActions, reducer } = slice;

export const useEventSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: eventSaga });
  return {
    actions: slice.actions,
  };
};
