import { RootState } from '../../types';
import { initialState } from '../slices/student';
import { createSelector } from '@reduxjs/toolkit';

const selectDomain = (state: RootState) => state.student || initialState;

export const getStudentList = createSelector([selectDomain], (state) => state.data.data);
