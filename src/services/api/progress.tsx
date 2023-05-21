import apiClient from '../base/apiClient';
import { APIs } from '../base/type';
import {
  AddProgressTokenQuery,
  ProgressDetailTokenQuery,
  ProgressExportTokenQuery,
  ProgressListTokenQuery,
  UpdateProgressTokenQuery,
} from '../../types/Progress';

export const getProgressListByClass = async (query: ProgressListTokenQuery) => {
  const { token, classId, ...rest } = query;
  const endPoint = APIs.teacher.progress.getProgressListByClass.replace('{classId}', `${classId}`);
  return new apiClient(token).post(endPoint, rest);
};

export const getProgressDetail = async (query: ProgressDetailTokenQuery) => {
  const { token, progressId } = query;
  const endPoint = APIs.student.progress.getProgressDetail.replace('{progressId}', `${progressId}`);
  return new apiClient(token).get(endPoint);
};

export const removeProgress = async (query: ProgressDetailTokenQuery) => {
  const { token, progressId } = query;
  const endPoint = APIs.teacher.progress.removeProgress.replace('{progressId}', `${progressId}`);
  return new apiClient(token).delete(endPoint);
};

export const updateProgress = async (query: UpdateProgressTokenQuery) => {
  const { token, progressId, payload } = query;
  const endPoint = APIs.teacher.progress.updateProgress.replace('{progressId}', `${progressId}`);
  return new apiClient(token).put(endPoint, payload);
};
export const addProgress = async (query: AddProgressTokenQuery) => {
  const { token, payload } = query;
  return new apiClient(token).post(APIs.teacher.progress.addProgress, payload);
};
export const exportReportCard = async (query: ProgressExportTokenQuery) => {
  const { token, studentId, year, semester } = query;
  const endPoint = APIs.student.progress.exportReportCard.replace('{studentId}', `${studentId}`);
  return new apiClient(token).get(endPoint, {
    year,
    semester,
  });
};
