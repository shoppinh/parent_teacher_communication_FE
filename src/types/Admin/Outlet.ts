import { Partners } from '.';

export interface AdminOutlet {
  id: number;
  name: string;
  mobilePhone: string;
  address?: string;
  fullAddress?: string;
  number?: string;
  zipcode?: string;
  wardId?: number;
  districtId?: number;
  provinceId?: number;
  countryId?: number;
  aboutThisStore?: string;
  timezone?: number;
  defaultCurrency?: number;
  externalOutletId?: number;
  isActive: boolean;
  isDeleted?: boolean;
  isSendZNS?: boolean;
  migrationId?: number;
  posPartners?: Partners[];
  publishedMenus?: number;
  storeDeliveryEnable?: boolean;
  storeId?: number;
  totalMenuIsPublish?: number;
  totalMenuIsUnPublish?: number;
  zeekInfo?: {
    appId?: string;
    appSecret?: string;
    storeId?: string;
  };
  alertTimeAt?: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface AdminOutletState {
  loading?: boolean;
  data: AdminOutletPayload;
}

export interface AdminOutletPayload {
  totalItems: number;
  data: AdminOutlet[];
}

export interface OutletListQuery {
  token: string;
  text: string;
  isMenuActive?: number;
  provinceId?: string;
  districtId?: string;
  offset?: number;
  limit?: number;
  orderBy?: string;
  orderDesc?: string;
}
