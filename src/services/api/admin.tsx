
import apiClient from '../base/apiClient';
import { APIs } from 'services/base/type';
import { AuthQuery } from 'types/Session';
import { qsBuilder } from 'utils/helpers';
import { FileQuery, MenuImportQuery } from 'types/Admin/Import';
import { OutletListQuery } from 'types/Admin/Outlet';
import { ActiveOutletPartnerQuery, DeactivateOutletPartnerQuery, FetchMenuPartnerQuery, MenuExportQuery, MenusOutletQuery, ProductNotesQuery, ZNSQuery } from 'types/Admin/Menu';
import { AdminBasicQuery } from 'types/Admin';


export const adminLogin = async (query: AuthQuery) => {
  const params = {
    mobilePhone: query.phone,
    password: query.password
  };

  return new apiClient('').post(APIs.admin.login, params);
}

export const adminMenuImport = async (query: MenuImportQuery) => {
  const params = {
    excelFile: query.excelFile,
    imageFiles: query.imageFiles,
    outletId: query.outletId
  };

  return new apiClient(query.token || '').post(APIs.admin.menuImport, params);
}

export const uploadExcelMenuFile = async (query: FileQuery) => {
  let formData: FormData = new FormData();
  formData.append('file', query.file);

  return new apiClient(query.token || '').post(APIs.admin.uploadExcelMenuFile, formData);
}

export const uploadImageMenuFile = async (query: FileQuery) => {
  let formData: FormData = new FormData();
  formData.append('file', query.file);
 
  return new apiClient(query.token || '').post(APIs.admin.uploadImageMenuFile, formData);
}

export const fetchOutletList = async (query: OutletListQuery) => {
  const { token, ...restQuery } = query;
  const qs = qsBuilder(restQuery);
  return new apiClient(token || '').get(APIs.admin.outlet.getList + qs);
}

export const fetchOutletDetail = async (query: MenusOutletQuery) => {
  const { token, outletId } = query;
  const url = APIs.admin.outlet.detail.replace('{outletId}', `${outletId}`);
  return new apiClient(token || '').get(url);
}

export const fetchMenusOutlet = async (query: MenusOutletQuery) => {
  const { token, outletId } = query;
  const url = APIs.admin.outlet.getMenuByOutlet.replace('{outletId}', `${outletId}`);
  // const qs = qsBuilder(restQuery);
  return new apiClient(token || '').get(url);
}

export const getAllThirdParty = async (query: AdminBasicQuery) => {
  const { token } = query;
  return new apiClient(token || '').get(APIs.admin.getAllThirdParty);
}

export const getExportDataMenu = async (query: MenuExportQuery) => {
  const { token, menuName, ...rest } = query;
  const qs = qsBuilder(rest);
  return new apiClient(token || '').get(APIs.admin.getExportDataMenu + qs);
}

export const doActiveOutletPartner = async (query: ActiveOutletPartnerQuery) => {
  const { token, outletId, menuId, ...rest } = query;
  return new apiClient(token || '').post(APIs.admin.activeOutlet, rest);
}

export const doDeactivateOutletPartner = async (query: DeactivateOutletPartnerQuery) => {
  const { token, outletId, menuId, ...rest } = query;
  return new apiClient(token || '').put(APIs.admin.deactivateOutlet, rest);
}

export const doFetchMenuPartnerData = async (query: FetchMenuPartnerQuery) => {
  const { token, menuId, ...rest } = query;
  const qs = qsBuilder(rest);
  return new apiClient(token || '').get(APIs.admin.thirdPartyInformation + qs);
}
export const doEnableProductNotes = async (query: ProductNotesQuery) => {
  const { token, outletId, ...rest } = query;
  return new apiClient(token || "").put(APIs.admin.enableProductNotes, rest );
}

export const doEnableZNS = async (query: ZNSQuery) => {
  const { token, ...rest } = query;
  return new apiClient(token || "").put(APIs.admin.sendZNSActive, rest );
}