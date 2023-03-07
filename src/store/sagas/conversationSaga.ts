import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiGetConversationDetail,
  apiGetConversationList,
  apiSendPushNotification,
} from 'services/api/apiHelper';
import { conversationActions as actions } from 'store/slices/conversation';

export function* conversationSaga() {
  yield all([
    takeLatest(actions.loadMessageList.type, getConversationDetail),
    takeLatest(actions.sendTestMessage.type, sendTestMessage),
    takeLatest(actions.loadConversationList.type, getConversationList),
  ]);
}

const ParseMessageData = (data) => {
  return data.map((item) => {
    return {
      content: item.content,
      contentType: item.contentType,
      createdAt: item.createdAt,
      id: item.id,
      isRead: item.isRead,
      mobilePhone: item.mobilePhone,
      roomId: item.roomId,
      roleId: item.roleId,
      updatedAt: item.updatedAt,
      userId: item.userId,
      userName: item.userName,
    };
  });
};

export function* getConversationDetail({ payload }: any) {
  try {
    const response = yield call(apiGetConversationDetail, payload);
    if (response.data && response.data.status) {
      yield put(
        actions.loadedMessageList({
          mobilePhone: payload.mobilePhone,
          roomId: payload.roomId,
          messages: ParseMessageData(response.data.data),
        })
      );
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* getConversationList({ payload }: any) {
  try {
    const response = yield call(apiGetConversationList, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadedConversationList(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
export function* sendTestMessage({ payload }: any) {
  try {
    const response = yield call(apiSendPushNotification, payload);
    if (response.data && response.data.status) {
      yield put(actions.sendTestMessageSuccess());
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (err) {
    console.log(err);
  }
}
