import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiGetPlatformSetting,
  apiGetSystemSettings,
  apiUpdateLanguage,
} from 'services/api/apiHelper';
import { configActions as actions } from 'store/slices/config';

export function* configSaga() {
  yield all([
    takeLatest(actions.loadPlatformSetting.type, getPlatformSetting),
    takeLatest(actions.doUpdateLanguage.type, doUpdateLanguage),
    takeLatest(actions.loadSystemSetting.type, getSystemSettings),
  ]);
}

function ParsePlatformSetting(data: any = {}) {
  return {
    admin: {
      mobilePhone: data.admin?.mobilePhone,
    },
    footers: {
      govInfos: {
        registered: {
          isShow: data.footers?.govInfos?.registered?.isShow,
          linkDetail: data.footers?.govInfos?.registered?.linkDetail,
          description: data.footers?.govInfos?.registered?.description,
        },
        announced: {
          isShow: data.footers?.govInfos?.announced?.isShow,
          linkDetail: data.footers?.govInfos?.announced?.linkDetail,
          description: data.footers?.govInfos?.announced?.description,
        },
      },
    },
    landingPage: {
      landingVideo: data.landingPage?.landingVideo,
      googlePlayLink: data.landingPage?.googlePlayLink,
      appleStoreLink: data.landingPage?.appleStoreLink,
    },
    languages: data.languages
      ? data.languages.map((item) => {
          return {
            code: item.code,
            name: item.name,
          };
        })
      : [],
  };
}

export function* getPlatformSetting() {
  try {
    const response = yield call(apiGetPlatformSetting);
    if (response.data && response.data.status) {
      yield put(actions.loadedPlatformSetting(ParsePlatformSetting(response.data.data)));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* doUpdateLanguage({ payload }: any) {
  try {
    const response = yield call(apiUpdateLanguage, payload);
    if (response.data && response.data.status) {
      // yield put(actions.loadedPlatformSetting(ParsePlatformSetting(response.data.data)));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getSystemSettings() {
  try {
    const response = yield call(apiGetSystemSettings);
    if (response.data && response.data.status) {
      yield put(actions.loadedSystemSetting(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
