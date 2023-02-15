import apiClient from "services/base/apiClient";
import {APIs} from "services/base/type";
import {LanguageQuery} from "types/Config";


export const getPlatformSetting = async () => {
    return new apiClient('').get(APIs.consumer.platformSetting);
}

export const updateLanguage = async (query: LanguageQuery) => {
    const payload = {
        consumerId: query.consumerId,
        langCode: query.langCode
    }
    return new apiClient(query?.accessToken || "").post(APIs.consumer.languageUpdate, payload);
}