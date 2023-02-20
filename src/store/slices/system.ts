import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { SystemPayload, SystemState } from '../../types/System';

export const initialState: SystemState = {
  data: {},
};

const slice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    updateSystemState(state, action: PayloadAction<SystemPayload>) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { name, actions: systemActions, reducer } = slice;

export const useSystemSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return {
    actions: systemActions,
  };
};
