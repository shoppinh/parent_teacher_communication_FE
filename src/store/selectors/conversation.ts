import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/conversation';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.conversation || initialState;

export const getConversationDetailState = (roomId: number) => {
  return createSelector([selectDomain], (state) => {
    return state.data[roomId];
  });
};

export const getCurrentRoomId = createSelector([selectDomain], (state) => state?.currentRoomId);

export const getCurrentToUser = createSelector([selectDomain], (state) => state?.currentToUser);

export const getConversationList = createSelector(
  [selectDomain],
  (state) => state?.conversationList
);

// export const get
