export interface FileQuery {
    file: File;
    token: string;
}
  
interface ImageImport {
    fileName: string;
    filePath: string;
}

export interface AdminImportSuccess {
    menuId?: number;
    menuLink?: string;
    menuName?: string;
    outletId?: number;
    menuPreviewUrl?: string;
}
  
export interface MenuImportQuery {
    token: string;
    excelFile: {
      fileName: string;
      filePath: string;
    };
    imageFiles?: ImageImport[];
    outletId: number;
}