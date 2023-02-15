import { ImageData } from "../Image";

export interface AdminMenu {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
    menuGUID: string;
    createdAt?: Date;
    dineIn?: boolean;
    imagePath?: string;
    isCloned?: boolean;
    isDeleted?: boolean;
    isDineInDeliveryEnable?: boolean;
    isProcessing?: boolean;
    isPublish: boolean;
    isZaloOSC?: boolean;
    menuImages?: ImageData[];
    menuPreviewUrl?: string;
    logs: ImportMenuLog[];
    menuTables?: any[];
    migrationId?: number;
    orderUrl?: string;
    outletId: number;
    posPartner?: string;
    shortenUrl?: string;
    updatedAt?: Date;
    zaloUrl?: string;
    isAllowNote: boolean;
    // additional - real time
    dataUrl?: string;
}

export interface ImportMenuLog {
    id: number;
    createdAt?: string;
    updatedAt?: string;
    key?: string;
    request?: string;
    statusCode?: string;
    response?: string;
    message: string;
}

export interface MenusOutletQuery {
    token: string;
    outletId: number;
  }

export interface MenusOutletPayload {
    data: AdminMenu[];
    outletId: number;
}

export interface MenuExportQuery {
    token: string;
    outletId: number;
    menuId: number;
    menuName?: string;
}

export interface ActiveOutletPartnerQuery {
    token: string;
    menuGuid: string;
    mobilePhone: string;
    partnerName: string;
    outletId: number;
    menuId: number;
}

export interface FetchMenuPartnerQuery {
    token: string;
    menuGUID: string;
    menuId: number;
    outletId: number;
}

export interface UpdateMenuPartnerPayload {
    menuId: number;
    outletId: number;
    partnerName: string;
    accessToken: PartnerMenuAccessToken;
}

export interface FetchMenuPartnerDataError {
    menuId: number;
    outletId: number;
}


export interface ActiveOutletPartnerPayload {
}

export interface DeactivateOutletPartnerQuery {
    token: string;
    menuGuid: string;
    mobilePhone: string;
    partnerName: string;
    outletId: number;
    menuId: number;
}

export interface MenuExportPayload {
    token: string;
    outletId: number;
    menuId: number;
    url: string;
}

export interface PartnerMenuAccessToken {
    id: number;
    createdAt?: Date;
    updatedAt?: Date;
    mobilePhone: string;
    accessToken: string;
    refreshToken?: string;
    partnerName: string;
    isActive: boolean;
}

export interface PartnerInfoData {
    name: string;
    accessToken: PartnerMenuAccessToken
}

export interface PartnerInfo {
    data: {
        [partnerName: string]: PartnerInfoData;
    }
    loading?: boolean;
}

export interface AdminMenuData{
    data: AdminMenu;
    partnerInfo: PartnerInfo;
}

export interface AdminMenuState {
    loading?: boolean;
    data: {
        [key: number]: {
            [key: number]: AdminMenuData
        };
    }
}

export interface ProductNotesPayload {
    menuId: number;
    isAllowNote: boolean;
    outletId: number;
}
export interface ProductNotesQuery extends ProductNotesPayload {
    token: string;
}

export interface ZNSPayload {
    isSendZNS: boolean;
    outletId: number;
}

export interface ZNSQuery extends ZNSPayload {
    token: string;
}

