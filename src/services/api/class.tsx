import { APIs } from '../base/type';
import apiClient from '../base/apiClient';
import { ClassListTokenQuery } from '../../types/Class';

export const getClassListByRole = async (query: ClassListTokenQuery) => {
  return new apiClient(query.token).get(APIs.class.getClassListByRole);
};
