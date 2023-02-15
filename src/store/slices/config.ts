import {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from 'utils/@reduxjs/toolkit';
import {loadState} from 'store/localStorage';
import {ConfigError, ConfigPayload, ConfigState, LanguageQuery} from 'types/Config';
import {useInjectReducer, useInjectSaga} from 'utils/redux-injectors';
import {configSaga} from 'store/sagas/configSaga';

const configCache = loadState()?.config;

export const initialState: ConfigState = {
    data: {...configCache?.data},
    error: null,
    loading: false,
};

const slice = createSlice({
    name: 'config',
    initialState,
    reducers: {


        loadPlatformSetting(state) {
            state.error = null;
            // state.data.admin = {};
            state.loading = true;
        },
        loadedPlatformSetting(state, action: PayloadAction<ConfigPayload>) {
            // state.data.admin = action.payload.admin;
            // state.data.footers = action.payload.footers;
            // state.data.landingPage = action.payload.landingPage;
            state.data.languages = action.payload.languages;
            state.data.lastUpdated = (new Date()).toISOString();
            state.loading = false;
        },
        doUpdateLanguage(state, action: PayloadAction<LanguageQuery>) {
            state.error = null;
        },
        Error(state, action: PayloadAction<ConfigError>) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {name, actions: configActions, reducer} = slice;

export const useConfigSlice = () => {
    useInjectReducer({key: slice.name, reducer: slice.reducer});
    useInjectSaga({key: slice.name, saga: configSaga});
    return {
        actions: slice.actions
    };
}