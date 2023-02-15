export interface SystemPayload {

    entryType?: entrySiteType;
    accessPageTime?: string;
}


export interface SystemState {
    data: SystemPayload
}

export enum entrySiteType {
    ZALO_MINI_APP = "ZALO_MINI_APP"
}