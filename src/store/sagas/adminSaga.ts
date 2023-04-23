import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  apiAddStudent,
  apiCreateParent,
  apiCreateSubject,
  apiCreateTeacher,
  apiCreateTeacherAssignment,
  apiGetParentList,
  apiGetStudentList,
  apiGetSubjectList,
  apiGetTeacherAssignmentList,
  apiGetTeacherList,
  apiRemoveParent,
  apiRemoveStudent,
  apiRemoveSubject,
  apiRemoveTeacher,
  apiRemoveTeacherAssignment,
  apiUpdateParent,
  apiUpdateStudent,
  apiUpdateSubject,
  apiUpdateTeacher,
  apiUpdateTeacherAssignment,
} from 'services/api/apiHelper';
import { CreateTeacherQuery, TeacherDetailQuery, UpdateTeacherQuery } from 'types/Admin/Teacher';
import { ListWithPaginationQuery } from 'types/Common';
import { CreateParentQuery, ParentDetailQuery, UpdateParentQuery } from 'types/Parent';
import { adminActions as actions } from '../slices/admin';
import { AddStudentQuery, StudentDetailTokenQuery, UpdateStudentQuery } from 'types/Student';
import {
  CreateTeacherAssignmentQuery,
  TeacherAssignmentDetailQuery,
  UpdateTeacherAssignmentQuery,
} from 'types/TeacherAssignment';
import { CreateSubjectQuery, SubjectDetailQuery, UpdateSubjectQuery } from 'types/Subject';
export function* adminSaga() {
  yield all([
    takeLatest(actions.loadParentList.type, loadParentListSaga),
    takeLatest(actions.createParent.type, createParentSaga),
    takeLatest(actions.updateParent.type, updateParentSaga),
    takeLatest(actions.removeParent.type, removeParentSaga),
    takeLatest(actions.loadTeacherList.type, loadTeacherListSaga),
    takeLatest(actions.createTeacher.type, createTeacherSaga),
    takeLatest(actions.updateTeacher.type, updateTeacherSaga),
    takeLatest(actions.removeTeacher.type, removeTeacherSaga),
    takeLatest(actions.loadStudentList.type, loadStudentListSaga),
    takeLatest(actions.createStudent.type, createStudentSaga),
    takeLatest(actions.updateStudent.type, updateStudentSaga),
    takeLatest(actions.removeStudent.type, removeStudentSaga),
    takeLatest(actions.loadAssignmentList.type, loadTeacherAssignmentListSaga),
    takeLatest(actions.createAssignment.type, createTeacherAssignmentSaga),
    takeLatest(actions.updateAssignment.type, updateTeacherAssignmentSaga),
    takeLatest(actions.removeAssignment.type, removeTeacherAssignmentSaga),
    takeLatest(actions.loadSubjectList.type, loadSubjectListSaga),
    takeLatest(actions.createSubject.type, createSubjectSaga),
    takeLatest(actions.updateSubject.type, updateSubjectSaga),
    takeLatest(actions.removeSubject.type, removeSubjectSaga),
  ]);
}

export function* loadParentListSaga({
  payload,
}: {
  type: string;
  payload: ListWithPaginationQuery;
}) {
  try {
    const response = yield call(apiGetParentList, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadParentListSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createParentSaga({ payload }: { type: string; payload: CreateParentQuery }) {
  try {
    const response = yield call(apiCreateParent, payload);
    if (response.data && response.data.status) {
      yield put(actions.createParentSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateParentSaga({ payload }: { type: string; payload: UpdateParentQuery }) {
  try {
    const response = yield call(apiUpdateParent, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateParentSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* removeParentSaga({ payload }: { type: string; payload: ParentDetailQuery }) {
  try {
    const response = yield call(apiRemoveParent, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeParentSuccess({ parentId: payload.parentId }));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* loadTeacherListSaga({
  payload,
}: {
  type: string;
  payload: ListWithPaginationQuery;
}) {
  try {
    const response = yield call(apiGetTeacherList, payload);
    console.log("🚀 ~ file: adminSaga.ts:125 ~ response:", response)
    if (response.data && response.data.status) {
      yield put(actions.loadTeacherListSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createTeacherSaga({ payload }: { type: string; payload: CreateTeacherQuery }) {
  try {
    const response = yield call(apiCreateTeacher, payload);
    if (response.data && response.data.status) {
      yield put(actions.createTeacherSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateTeacherSaga({ payload }: { type: string; payload: UpdateTeacherQuery }) {
  try {
    const response = yield call(apiUpdateTeacher, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateTeacherSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* removeTeacherSaga({ payload }: { type: string; payload: TeacherDetailQuery }) {
  try {
    const response = yield call(apiRemoveTeacher, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeTeacherSuccess({ teacherId: payload.teacherId }));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* loadStudentListSaga({
  payload,
}: {
  type: string;
  payload: ListWithPaginationQuery;
}) {
  try {
    const response = yield call(apiGetStudentList, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadStudentListSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data?.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createStudentSaga({ payload }: { type: string; payload: AddStudentQuery }) {
  try {
    const response = yield call(apiAddStudent, payload);
    if (response.data && response.data.status) {
      yield put(actions.createStudentSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateStudentSaga({ payload }: { type: string; payload: UpdateStudentQuery }) {
  try {
    const response = yield call(apiUpdateStudent, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateStudentSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* removeStudentSaga({
  payload,
}: {
  type: string;
  payload: StudentDetailTokenQuery;
}) {
  try {
    const response = yield call(apiRemoveStudent, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeStudentSuccess({ studentId: payload.studentId }));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* loadTeacherAssignmentListSaga({
  payload,
}: {
  type: string;
  payload: ListWithPaginationQuery;
}) {
  try {
    const response = yield call(apiGetTeacherAssignmentList, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadAssignmentListSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createTeacherAssignmentSaga({
  payload,
}: {
  type: string;
  payload: CreateTeacherAssignmentQuery;
}) {
  try {
    const response = yield call(apiCreateTeacherAssignment, payload);
    if (response.data && response.data.status) {
      yield put(actions.createAssignmentSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateTeacherAssignmentSaga({
  payload,
}: {
  type: string;
  payload: UpdateTeacherAssignmentQuery;
}) {
  try {
    const response = yield call(apiUpdateTeacherAssignment, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateAssignmentSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data?.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* removeTeacherAssignmentSaga({
  payload,
}: {
  type: string;
  payload: TeacherAssignmentDetailQuery;
}) {
  try {
    const response = yield call(apiRemoveTeacherAssignment, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeAssignmentSuccess({ assignmentId: payload.teacherAssignmentId }));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* loadSubjectListSaga({
  payload,
}: {
  type: string;
  payload: ListWithPaginationQuery;
}) {
  try {
    const response = yield call(apiGetSubjectList, payload);
    if (response.data && response.data.status) {
      yield put(actions.loadSubjectListSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createSubjectSaga({ payload }: { type: string; payload: CreateSubjectQuery }) {
  try {
    const response = yield call(apiCreateSubject, payload);
    if (response.data && response.data.status) {
      yield put(actions.createSubjectSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateSubjectSaga({ payload }: { type: string; payload: UpdateSubjectQuery }) {
  try {
    const response = yield call(apiUpdateSubject, payload);
    if (response.data && response.data.status) {
      yield put(actions.updateSubjectSuccess(response.data.data));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* removeSubjectSaga({ payload }: { type: string; payload: SubjectDetailQuery }) {
  try {
    const response = yield call(apiRemoveSubject, payload);
    if (response.data && response.data.status) {
      yield put(actions.removeSubjectSuccess({ subjectId: payload.subjectId }));
    } else {
      yield put(actions.Error(response.data.error));
    }
  } catch (error) {
    console.log(error);
  }
}
