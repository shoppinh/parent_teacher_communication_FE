import { all, call, put, takeLatest } from 'redux-saga/effects';
import { apiAddEvent, apiGetEventList, apiRemoveEvent } from 'services/api/apiHelper';
import { eventActions as actions } from 'store/slices/event';
import { AddEventQuery, EventDetailQuery, EventListQuery } from 'types/Event';

export function* eventSaga() {
  yield all([
    takeLatest(actions.loadEventList.type, getEventList),
    takeLatest(actions.addEvent.type, addEvent),
    takeLatest(actions.deleteEvent.type, deleteEvent),
  ]);
}

export const mapEventList = (data: any) => {
  return data?.map((item: any) => {
    return parseEvent(item);
  });
};
export const parseEvent = (item: any) => {
  return {
    _id: item?._id,
    title: item?.title,
    start: item?.start,
    end: item?.end,
    allDay: item?.allDay,
    content: item?.content,
    participants: item?.participants,
  };
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
export function* addEvent({ payload }: { payload: AddEventQuery; type: string }) {
  try {
    const response = yield call(apiAddEvent, payload);
    if (response.data && response.data.status) {
      yield put(actions.addedEvent(parseEvent(response.data.data)));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* deleteEvent({ payload }: { payload: EventDetailQuery; type: string }) {
  try {
    const response = yield call(apiRemoveEvent, payload);
    if (response.data && response.data.status) {
      yield put(actions.deletedEvent(payload));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
