import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiGetClassListByRole } from 'services/api/apiHelper';
import { classActions as actions } from 'store/slices/class';

export function* classSaga() {
  yield all([takeLatest(actions.loadClassList.type, getClassListByRole)]);
}

export function mapClassList(data: any) {
  return data.map((item: any) => {
    return {
      _id: item.class._id,
      name: item.class.name,
      createdAt: item.class.createdAt,
      updatedAt: item.class.updatedAt,
    };
  });
}

export function* getClassListByRole({ payload }: any) {
  try {
    const response = yield call(apiGetClassListByRole, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.loadClassListSuccess({
          data: mapClassList(response.data.data.data),
          total: response.data.data.total,
        })
      );
    } else {
      yield put(actions.loadClassListError(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
