import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from 'store/slices/admin';

const selectDomain = (state: RootState) => state.admin || initialState;

export const getAdminError = createSelector(
  [selectDomain],
  state => state.error,
);

export const getAdminLoading = createSelector(
  [selectDomain],
  state => state.loading,
);

export const getIsImportMenuSuccess = createSelector(
  [selectDomain],
  state => state.data.import?.success,
)

export const getImportMenuSuccessData = createSelector(
  [selectDomain],
  state => state.data.import?.data,
)

export const getAdminOutletList =  createSelector(
  [selectDomain],
  state => state.data.outlets?.data?.data,
)

export const getAdminOutletTemp =  createSelector(
  [selectDomain],
  state => state.data.outletTemp,
)

export const getAdminOutletTotalItem =  createSelector(
  [selectDomain],
  state => state.data.outlets?.data?.totalItems,
)

export const getAdminOutletLoading =  createSelector(
  [selectDomain],
  state => state.data.outlets?.loading,
)

export const getAdminOutletMenus = (outletid: number) => {
  return createSelector(
    [selectDomain],
    state => state.data.menus.data[outletid],
  )
};

export const getAdminOutletMenusLoading =  createSelector(
  [selectDomain],
  state => state.data.menus?.loading,
)

export const getAdminConfigPartner =  createSelector(
  [selectDomain],
  state => state.data.config?.partners,
)

export const getCurrentMenuDataUrl =  createSelector(
  [selectDomain],
  state => state.data.session?.currentDataMenuUrl,
)