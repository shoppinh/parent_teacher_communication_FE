import { PayloadAction } from '@reduxjs/toolkit';
import { DevicePayload, DeviceState } from 'types/Device';
import { createSlice } from 'utils/@reduxjs/toolkit';

export const initialState: DeviceState = {
  data: {
    isIOS: false,
  },
};

const slice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    updateDeviceState(state, action: PayloadAction<DevicePayload>) {
      state.data = {
        ...state.data,
        ...action.payload,
      };
    },
  },
});

export const { name, actions: deviceActions, reducer } = slice;
