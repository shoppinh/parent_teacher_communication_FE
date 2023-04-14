import apiClient from 'services/base/apiClient';
import { APIs } from 'services/base/type';
import { FileUploadQuery, InvitationQuery, LanguageQuery } from 'types/Config';

export const getPlatformSetting = async () => {
  return new apiClient('').get(APIs.user.platformSetting);
};

export const updateLanguage = async (query: LanguageQuery) => {
  const payload = {
    consumerId: query.userId,
    langCode: query.langCode,
  };
  return new apiClient(query?.accessToken || '').post(APIs.user.languageUpdate, payload);
};

export const getSystemSettings = async () => {
  return new apiClient('').get(APIs.settings.getSettings);
};

export const sendInvitation = async (query: InvitationQuery) => {
  return new apiClient(query?.accessToken || '').post(APIs.user.sendInvitation, {
    email: query.email,
    token: query.accessToken,
  });
};

export const uploadFile = async (query: FileUploadQuery) => {
  const formData = new FormData();
  formData.append('file', query.file);
  return new apiClient().post(APIs.user.uploadFile, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
