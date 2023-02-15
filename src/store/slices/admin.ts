import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
// import { loadState } from 'store/localStorage';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { AdminBasicQuery, AdminConfig, AdminError, AdminState } from 'types/Admin';
import { adminSaga } from 'store/sagas/adminSaga';
import { AdminOutlet, AdminOutletPayload, OutletListQuery } from 'types/Admin/Outlet';
import { AdminImportSuccess } from 'types/Admin/Import';
import { ActiveOutletPartnerPayload, ActiveOutletPartnerQuery, FetchMenuPartnerDataError, FetchMenuPartnerQuery, MenuExportQuery, MenusOutletPayload, MenusOutletQuery, ProductNotesPayload, ProductNotesQuery, UpdateMenuPartnerPayload, ZNSPayload, ZNSQuery } from 'types/Admin/Menu';
// import { MenuPayLoad } from 'types/Menu';

// const adminCache = loadState()?.admin;

export const initialState: AdminState = {
  error: null,
  data: {
    outlets: {
      loading: false,
      data: {
        totalItems: 0,
        data: []
      }
    },
    import: {
      success: false,
      data: {}
    },
    menus: {
      loading: false,
      data: {}
    },
    config: {},
    session: {}
  },
  loading: false,
};

const slice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    doUploadMenu(state, action: any) {
      const importState = {
        success: false,
        data: {}
      }
      state.data.import = {
        ...state.data.import,
        ...importState
      };
      state.error = null;
      state.loading = true;
    },
    doUploadMenuSuccess(state, action: PayloadAction<AdminImportSuccess>) {
      const importState = {
        success: true,
        data: action.payload
      }
      state.data.import = {
        ...state.data.import,
        ...importState
      };
      state.loading = false;
      state.error = null;
    },
    doFetchOutlet(state, action: PayloadAction<MenusOutletQuery>) {
      state.loading = true;
      state.data.outletTemp = undefined;
      state.error = null;
    },
    loadedOutlet(state, action: PayloadAction<AdminOutlet>) {
      state.loading = false;
      state.data.outletTemp = action.payload;
      state.error = null;
    },
    doFetchOutletList(state, action: PayloadAction<OutletListQuery>) {
      state.data.outlets.loading = true;
      state.data.outlets.data = {
        totalItems: 0,
        data: []
      };
      state.error = null;
    },
    loadedOutletList(state, action: PayloadAction<AdminOutletPayload>) {
      state.data.outlets = {
        loading: false,
        data: {
          totalItems: action.payload?.totalItems || 0,
          data: [
            ...action.payload?.data
          ]
        }
      };
      state.error = null;
    },
    doFetchMenusOutlet(state, action: PayloadAction<MenusOutletQuery>) {
      state.data.menus = {
        ...state.data.menus,
        data: {
          ...state.data.menus.data,
          [action.payload.outletId]: {}
        },
        loading: true,
      }
      state.error = null;
    },
    loadedMenusOutlet(state, action: PayloadAction<MenusOutletPayload>) {
      const menuObject = action.payload.data.reduce((prev, curr) => {
            return {
              ...prev,
              [curr.id]: {
                data: curr
              }
            }
      }, {})
      state.data.menus = {
        loading: false,
        data: {
          ...state.data.menus.data,
          [action.payload.outletId]: menuObject
        }
      }
      state.error = null;
    },
    getAllThirdParty(state, action: PayloadAction<AdminBasicQuery>) {
      state.error = null;
    },
    updateConfigThirdParty(state, action: PayloadAction<AdminConfig>) {
      state.data.config = {
        ...state.data.config,
        ...action.payload
      }
      state.error = null;
    },
    getExportDataMenu(state, action: PayloadAction<MenuExportQuery>) {
      state.data.session.currentDataMenuUrl = "";
      state.error = null;
    },
    doFetchMenuPartnerData(state, action: PayloadAction<FetchMenuPartnerQuery>) {
      const currentMenuData = state.data.menus.data[action.payload.outletId][action.payload.menuId];
      state.data.menus.data[action.payload.outletId][action.payload.menuId] = {
        ...(currentMenuData || {}),
        partnerInfo: {
          ...(currentMenuData?.partnerInfo || {}),
          loading: true,
        }
      }
      state.error = null;
    },
    updateMenuPartnerData(state, action: PayloadAction<UpdateMenuPartnerPayload>) {
      const currentMenuData = state.data.menus.data[action.payload.outletId][action.payload.menuId];
      state.data.menus.data[action.payload.outletId][action.payload.menuId] = {
        ...(currentMenuData || {}),
        partnerInfo: {
          ...(currentMenuData?.partnerInfo || {}),
          data: {
            ...(currentMenuData?.partnerInfo?.data || {}),
            ...(action.payload.partnerName ? {
              [action.payload.partnerName]: {
                name: action.payload.partnerName,
                accessToken: action.payload.accessToken
              }
            } : {})
          },
          loading: false,
        }
      }
      state.loading = false;
      state.error = null;
    },
    updateZNSStatus(state, action: PayloadAction<ZNSPayload>) {
      const OutletList = state.data.outlets?.data?.data || [];

      const outletIndex = OutletList.findIndex(item => item.id === action.payload.outletId);
      if(outletIndex >= 0 && OutletList.length > 0) {
        state.data.outlets.data.data[outletIndex] = {
          ...state.data.outlets.data.data[outletIndex],
          isSendZNS: action.payload.isSendZNS
        }
      }
      state.loading = false;
      state.error = null;
    },
    updateProductNotes(state, action: PayloadAction<ProductNotesPayload>) {
      const currentMenuData = state.data.menus.data[action.payload.outletId][action.payload.menuId];
      state.data.menus.data[action.payload.outletId][action.payload.menuId] = {
        ...(currentMenuData || {}),
        data: {
          ...(currentMenuData?.data),
          isAllowNote: action.payload.isAllowNote
        }
      }
      state.loading = false;
      state.error = null;
    },
    fetchMenuPartnerDataError(state, action: PayloadAction<FetchMenuPartnerDataError>) {
      const currentMenuData = state.data.menus.data[action.payload.outletId][action.payload.menuId];
      state.data.menus.data[action.payload.outletId][action.payload.menuId] = {
        ...(currentMenuData || {}),
        partnerInfo: {
          ...(currentMenuData?.partnerInfo || {}),
          loading: false,
        }
      }
      state.loading = false;
      state.error = null;
    },
    doActiveOutletPartner(state, action: PayloadAction<ActiveOutletPartnerQuery>) {
      state.loading = true;
      state.error = null;
    },
    doDeActivateOutletPartner(state, action: PayloadAction<ActiveOutletPartnerQuery>) {
      state.loading = true;
      state.error = null;
    },
    activeOutletPartnerSuccess(state, action: PayloadAction<ActiveOutletPartnerPayload>) {
      state.loading = false;
      state.error = null;
    },
    doEnableProductNotes(state, action: PayloadAction<ProductNotesQuery>) {
      state.loading = true;
      state.error = null;
    },
    doEnableZNS(state, action: PayloadAction<ZNSQuery>) {
      state.loading = true;
      state.error = null;
    },
    Error(state, action: PayloadAction<AdminError>) {
      const importState = {
        success: false
      }
      state.data.import = {
        ...state.data.import,
        ...importState
      };
      state.data.outlets = {
        ...state.data.outlets,
        loading: false,
      };
      state.data.menus = {
        ...state.data.menus,
        loading: false,
      };
      state.error = action.payload;
      state.loading = false;
    },
    removeError(state) {
      state.loading = false;
      state.error = null;
    }
  },
});

export const { name, actions: adminActions, reducer } = slice;

export const useAdminSlice = () => {
  useInjectReducer({key: slice.name, reducer: slice.reducer});
  useInjectSaga({key: slice.name, saga: adminSaga});

  return {
    actions: adminActions,
  };
}