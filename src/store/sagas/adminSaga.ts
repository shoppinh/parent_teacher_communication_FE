import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiDoUploadImageMenuFile, apiDoUploadExcelMenuFile, apiAdminMenuImport, apiDoFetchOutletList, apiDoFetchMenusOutlet, apiGetAllThirdParty, apiGetExportDataMenu, apiDoActiveOutletPartner, apiDoFetchMenuPartnerData, apiDoDeactivateOutletPartner, apiDoFetchOutlet, apiDoEnableProductNotes, apiDoEnableZNS } from 'services/api/apiHelper';
import { adminActions as actions } from 'store/slices/admin';
import i18next from 'i18next';
import { ActiveOutletPartnerQuery, DeactivateOutletPartnerQuery, FetchMenuPartnerQuery, MenusOutletQuery, ProductNotesQuery, ZNSQuery } from 'types/Admin/Menu';

export function* adminSaga() {
  yield all([
      takeLatest(actions.doUploadMenu, doUploadMenu),
      takeLatest(actions.doFetchOutletList, doFetchOutletList),
      takeLatest(actions.doFetchMenusOutlet, doFetchMenusOutlet),
      takeLatest(actions.getAllThirdParty, getAllThirdParty),
      takeLatest(actions.doActiveOutletPartner, doActiveOutletPartner),
      takeLatest(actions.doDeActivateOutletPartner, doDeactivateOutletPartner),
      takeLatest(actions.doFetchMenuPartnerData, doFetchMenuPartnerData),
      takeLatest(actions.doFetchOutlet, doFetchOutlet),
      takeLatest(actions.doEnableProductNotes, doEnableProductNotes),
      takeLatest(actions.doEnableZNS, doEnableZNS)
  ])
}

export function* doUploadMenu({ payload }: any) {
  try {
    // ---- Phase 1: Upload excel ----
    const excelResponse = yield call(apiDoUploadExcelMenuFile, { file: payload.menuFile, token: payload.accessToken})
    if(excelResponse.data?.error ) {
      throw excelResponse.data.error;
    } 
    // ---- Phase 2: Validate Image list ----
    // Correct number of image files have been uploaded. Correct image file names, correct file extension. 
    const excelData = excelResponse.data?.data?.excelData || [];
    const menuImageRow = excelData.filter(row => row.menuImage && row.menuImage !== "").shift();
    const menuImage = !!menuImageRow ? menuImageRow.menuImage : "";
    const productImages = excelData.filter(row => row.productImages && row.productImages !== "").reduce((prev, curr) => {
      const productImagesCell = curr.productImages.split(",");
      return [
        ...prev,
        ...productImagesCell
      ] 
    }, []);

    const uploadImageList = [
      ...(productImages.filter((v, i, s) => {
        return s.indexOf(v) === i;
      })),
      ...( menuImage !== '' ? [menuImage] : [])
    ]

    // Missing
    if(uploadImageList.length >= (payload.imageFiles || []).length) {
      const missingImages = uploadImageList.filter((item, index) => {
        return payload.imageFiles.findIndex(file => {
          return file.name === item
        }) < 0;
      })
      if(missingImages.length > 0) {
        throw new Error(`${i18next.t("admin.missing")} ${missingImages.join(", ")}`);
      }
    } 

    // Redundant or Same will allowed to continue
    const allowedImages = payload.imageFiles.filter(item => uploadImageList.indexOf(item.name) >= 0)

    // ---- Phase 3: Upload images ---- // 
    const imageTask = allowedImages.map(fileOb => {
      return call(apiDoUploadImageMenuFile, {file: fileOb, token: payload.accessToken})
    })
    const [...imageResponses] = yield all(
      [
        ...imageTask
      ])
    
    if(imageResponses.some(res => res.data.error)) {
      throw imageResponses.find(res => !res.data).data?.error;
    }

    // ---- Phase 4: Import Phase ---- // 
    if(excelResponse.data?.data?.fileName !== "" && excelResponse.data?.data?.filePath !== "") {
      const excelFileData = {
        fileName: excelResponse.data?.data?.fileName,
        filePath: excelResponse.data?.data?.filePath 
      };
      const imageFilesData = (imageResponses || []).reduce((prev, curr) => {
        return [
          ...prev,
          curr.data.data
        ]
      }, []);
      const importPayload = {
        excelFile: excelFileData,
        imageFiles: imageFilesData,
        token: payload.accessToken,
        outletId: payload.outletId
      }
      const importResponse = yield call(apiAdminMenuImport, importPayload);
      if(importResponse.data?.error ) {
        throw importResponse.data.error;
      }
      const importedData = (importResponse.data?.data || []).shift();
      yield put(actions.doUploadMenuSuccess({
        menuId: importedData?.menuId || NaN,
        menuLink: importedData?.menuLink || "",
        menuName: importedData?.menuName || "",
        outletId: importedData?.outletId || NaN,
        menuPreviewUrl: importedData?.menuPreviewUrl || "",
      }));
    } else {
      throw new Error(i18next.t("admin.missingExcelFileNameAndPath") as string)
    }
  } catch (err: any) {
    if(err instanceof Error) {
      if(err.message === "Network Error") {
        yield put(actions.Error({
          code: 999,
          message: i18next.t("admin.pleaseSelectTheFileToUploadAgainOrCheckTheNetwork") as string
        }));
      } else {
        yield put(actions.Error({
          code: 111,
          message: (err instanceof Error) ? err.message : String(err)
        }));
      }
    } else {
      yield put(actions.Error(err));
    }
    
    console.log(err);
  }
}

const ParseAdminOutletDetail = (response) => {
  return {
    id: response?.id,
    name: response?.name,
    mobilePhone: response?.mobilePhone,
    address: response?.address,
    fullAddress: response?.fullAddress,
    number: response?.number,
    zipcode: response?.zipcode,
    wardId: response?.wardId,
    districtId: response?.districtId,
    provinceId: response?.provinceId,
    countryId: response?.countryId, 
    aboutThisStore: response?.aboutThisStore,
    timezone: response?.timezone,
    defaultCurrency: response?.defaultCurrency,
    externalOutletId: response?.externalOutletId,
    isActive: response?.isActive,
    isDeleted: response?.isDeleted,
    isSendZNS: response?.isSendZNS,
    migrationId: response?.migrationId,
    posPartners: (response?.posPartners || []).map((partner) => {
      return {
        name: partner.name
      }
    }),
    publishedMenus: response?.publishedMenus,
    storeDeliveryEnable: response?.storeDeliveryEnable,
    storeId: response?.storeId,
    totalMenuIsPublish: response?.totalMenuIsPublish,
    totalMenuIsUnPublish: response?.totalMenuIsUnPublish,
    zeekInfo: response?.zeekInfo ? {
        appId: response?.zeekInfo.appId,
        appSecret: response?.zeekInfo.appSecret,
        storeId: response?.zeekInfo.storeId,
    } : {},
    alertTimeAt: response?.alertTimeAt,
    updatedAt: response?.updatedAt,
    createdAt: response?.createdAt,
  }
}

const ParseAdminOutletList = (response) => {
  return {
    totalItems: response?.totalItem || 0,
    data: (response?.outlets || []).map((item) => {
      return ParseAdminOutletDetail(item);
    }),
  }
}

export function* doFetchOutletList({ payload }: any) {
  try {
    const response = yield call(apiDoFetchOutletList, payload);
    if(response.data && response.data.status) {
      const adminOutletPayload = ParseAdminOutletList(response.data.data);
      yield put(
        actions.loadedOutletList(adminOutletPayload)
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch(err) {
    console.log(err);
  }
}

const ParseMenusAdmin = (response) => {
  return (response?.data || []).map((item) => {
    return {
      id: item?.id,
      name: item?.name,
      updatedAt: item?.updatedAt,
      createdAt: item?.createdAt,
      description: item?.description,
      isActive: item?.isActive,
      menuGUID: item?.menuGUID,
      dineIn: item?.dineIn,
      imagePath: item?.imagePath,
      isCloned: item?.isCloned,
      isDeleted: item?.isDeleted,
      isDineInDeliveryEnable: item?.isDineInDeliveryEnable,
      isProcessing: item?.isProcessing,
      isPublish: item?.isPublish,
      isZaloOSC: item?.isZaloOSC,
      isAllowNote: item?.isAllowNote,
      menuImages: item?.menuImages,
      menuPreviewUrl: item?.menuPreviewUrl,
      logs: item.logs?.map((logsItem) => {
        return {
          id: logsItem.id,
          createdAt: logsItem.createdAt,
          updatedAt: logsItem.updatedAt,
          key: logsItem.key,
          request: logsItem.request,
          statusCode: logsItem.statusCode,
          response: logsItem.response,
          message: logsItem.message,
        }
      }),
      menuTables: item?.menuTables,
      migrationId: item?.migrationId,
      orderUrl: item?.orderUrl,
      outletId: item?.outletId,
      posPartner: item?.posPartner,
      shortenUrl: item?.shortenUrl,
      zaloUrl: item?.zaloUrl,
    }
  })
}

export function* doFetchMenusOutlet({ payload }: any) {
  try {
    const response = yield call(apiDoFetchMenusOutlet, payload);
    if(response.data && response.data.status) {
      const adminMenusOutletPayload = ParseMenusAdmin(response.data.data);
      yield put(
        actions.loadedMenusOutlet({
          outletId: payload.outletId,
          data: adminMenusOutletPayload
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch(err) {
    console.log(err);
  }
}

export function* getAllThirdParty({ payload }: any) {
  try {
    const response = yield call(apiGetAllThirdParty, payload);
    if(response.data && response.data.status) {
      yield put(
        actions.updateConfigThirdParty({
          partners: response.data.data.partners
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch(err) {
    console.log(err);
  }
}


export function* doActiveOutletPartner({ payload }: {
  type: string,
  payload: ActiveOutletPartnerQuery
}) {
  try {
    const response = yield call(apiDoActiveOutletPartner, payload);
    if(response.data && response.data.status) {
      yield put(actions.doFetchMenuPartnerData({
        token: payload.token,
        menuGUID: payload.menuGuid,
        menuId: payload.menuId,
        outletId: payload.outletId
      }));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch(err) {
    console.log(err);
  }
}

export function* doDeactivateOutletPartner({ payload }: {
  type: string,
  payload: DeactivateOutletPartnerQuery
}) {
  try {
    const response = yield call(apiDoDeactivateOutletPartner, payload);
    if(response.data && response.data.status) {
      yield put(actions.doFetchMenuPartnerData({
        token: payload.token,
        menuGUID: payload.menuGuid,
        menuId: payload.menuId,
        outletId: payload.outletId
      }));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch(err) {
    console.log(err);
  }
}

export function* doFetchMenuPartnerData({ payload }: {
  type: string,
  payload: FetchMenuPartnerQuery
}) {
  try {
    const response = yield call(apiDoFetchMenuPartnerData, payload);
    if(response.data && response.data.status) {
      yield put(actions.updateMenuPartnerData({
          outletId: payload.outletId,
          menuId: payload.menuId,
          partnerName: response.data.data?.accessToken?.partnerName,
          accessToken: response.data.data?.accessToken
      }))
    } else {
      yield put(actions.fetchMenuPartnerDataError({
          outletId: payload.outletId,
          menuId: payload.menuId
      }));
      
    }
  } catch(err) {
    console.log(err);
  }
}

export function* doFetchOutlet({ payload }: {
  type: string,
  payload: MenusOutletQuery
}) {
  try {
    const response = yield call(apiDoFetchOutlet, payload);
    if(response.data && response.data.status) {
      const outletDetail = response.data.data?.outlet;
      if(outletDetail) {
        yield put(actions.loadedOutlet(ParseAdminOutletDetail(outletDetail)))
      }
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch(err) {
    console.log(err);
  }
}

export function* doEnableProductNotes({payload}: {
  type: string;
  payload: ProductNotesQuery
}) {

  try {
    const response = yield call(apiDoEnableProductNotes, payload);
    if(response.data && response.data.status) {
      yield put(actions.updateProductNotes(
      {
        menuId: payload.menuId,
        outletId: payload.outletId,
        isAllowNote: response.data.data.isAllowNote
      }
      ));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch(err) {
    console.log(err);
  }
}

export function* doEnableZNS({payload}: {
  type: string;
  payload: ZNSQuery
}) {

  try {
    const response = yield call(apiDoEnableZNS, payload);
    if(response.data && response.data.status) {
      yield put(actions.updateZNSStatus(
      {
        outletId: payload.outletId,
        isSendZNS: response.data.data.isSendZNS
      }
      ));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch(err) {
    console.log(err);
  }
}