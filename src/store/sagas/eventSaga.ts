import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiGetEventList } from 'services/api/apiHelper';
import { eventActions as actions } from 'store/slices/event';
import { EventListQuery } from 'types/Event';

export function* eventSaga() {
  yield all([takeLatest(actions.loadEventList.type, getEventList)]);
}

export const mapEventList = (data: any) => {
  return data?.map((item: any) => {
    return {
      _id: item?._id,
      title: item?.title,
      start: item?.start,
      end: item?.end,
      allDay: item?.allDay,
      participants: item?.participants,
    };
  });
};

export function* getEventList({ payload }: { payload: EventListQuery; type: string }) {
  try {
    const response = yield call(apiGetEventList, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.loadedEventList({
          data: mapEventList(response.data.data.data),
          total: response.data.data.totalItem,
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
