import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
// import { loadState } from 'store/localStorage';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { AdminBasicQuery, AdminConfig, AdminError, AdminState } from 'types/Admin';
import { adminSaga } from 'store/sagas/adminSaga';

// import { MenuPayLoad } from 'types/Menu';

// const adminCache = loadState()?.admin;

export const initialState: AdminState = {
  error: null,
  data: {
    config: {},
    session: {},
  },
  loading: false,
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    getAllThirdParty(state, action: PayloadAction<AdminBasicQuery>) {
      state.error = null;
    },
    updateConfigThirdParty(state, action: PayloadAction<AdminConfig>) {
      state.data.config = {
        ...state.data.config,
        ...action.payload,
      };
      state.error = null;
    },

    Error(state, action: PayloadAction<AdminError>) {
      state.error = action.payload;
      state.loading = false;
    },
    removeError(state) {
      state.loading = false;
      state.error = null;
    },
  },
});

export const { name, actions: adminActions, reducer } = slice;

export const useAdminSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: adminSaga });

  return {
    actions: adminActions,
  };
};
