import { PayloadAction } from '@reduxjs/toolkit';
import { loadState } from 'store/localStorage';
import { parentSaga } from 'store/sagas/parentSaga';
import { ParentError, ParentState } from 'types/Parent';
import {
  AddLeaveFormQuery,
  LeaveForm,
  StudentLeaveFormListQuery,
  UpdateLeaveFormPayload,
  UpdateLeaveFormQuery,
} from 'types/Student';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

const parentCache = loadState()?.cache;

export const initialState: ParentState = {
  data: { ...parentCache?.data },
  error: null,
  loading: false,
};

const slice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    loadLeaveFormList: (state, action: PayloadAction<StudentLeaveFormListQuery>) => {
      state.error = null;
      state.loading = true;
    },
    loadLeaveFormListSuccess: (
      state,
      action: PayloadAction<{ data: LeaveForm[]; totalItem: number }>
    ) => {
      state.error = null;
      state.loading = false;
      state.data.leaveFormList = action.payload;
    },
    submitLeaveForm: (state, action: PayloadAction<AddLeaveFormQuery>) => {
      state.error = null;
      state.loading = true;
    },
    submitLeaveFormSuccess: (state) => {
      state.error = null;
      state.loading = false;
    },
    updateLeaveForm: (state, action: PayloadAction<UpdateLeaveFormQuery>) => {
      state.error = null;
      state.loading = true;
    },
    updateLeaveFormSuccess: (state, action: PayloadAction<UpdateLeaveFormPayload>) => {
      state.error = null;
      state.loading = false;
      state.data.leaveFormList.data = state.data.leaveFormList.data?.map((item) => {
        if (item._id === action.payload.formId) {
          return {
            ...item,
            title: action.payload.title || item.title,
            leaveDate: action.payload.leaveDate || item.leaveDate,
            reason: action.payload.reason || item.reason,
          };
        }
        return item;
      });
    },
    Error: (state, action: PayloadAction<ParentError>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { name, actions: parentActions, reducer } = slice;

export const useParentSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: parentSaga });
  return {
    actions: slice.actions,
  };
};
