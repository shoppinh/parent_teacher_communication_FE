import axios, { AxiosRequestConfig } from 'axios';
import { fetchCurrentLocale } from 'utils/localization';
import { responseInterceptor, errorInterceptor, requestInterceptor } from './interceptor';
import { AcceptType } from './type';

// axios.defaults.baseURL = 'http://10.10.13.158:3000';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
// Timeout seconds
axios.defaults.timeout = Number(process.env.REACT_APP_API_TIMEOUT) || 600000;
axios.interceptors.response.use(responseInterceptor, errorInterceptor);
axios.interceptors.request.use(requestInterceptor, errorInterceptor);

const defaultHeader = {
  Accept: AcceptType.json,
  'Content-Type': AcceptType.json,
};

const formHeader = {
  Accept: AcceptType.formData,
  'Content-Type': AcceptType.formData,
};

const urlEncodeHeader = {
  Accept: AcceptType.formData,
  'Content-Type': AcceptType.urlEncode,
};

class apiClient {
  config: AxiosRequestConfig;
  headers: any;

  constructor(token?: string) {
    const authHeader = token && token.length > 0 ? { Authorization: 'Bearer ' + token } : null;
    const currentLocale = fetchCurrentLocale();
    this.config = {
      validateStatus: () => true,
    };
    this.headers = {
      ...defaultHeader,
      ...authHeader,
      locale: currentLocale,
    };
  }

  get = (url: string, body?: any, option?: any) => {
    option = option || {};
    const { headers, ...rest } = option;
    return axios.get(url, {
      ...this.config,
      params: {
        ...body,
      },
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  post = (url: string, body?: any, option?: any) => {
    option = option || {};
    const { headers, ...rest } = option;

    return axios.post(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  put = (url: string, body?: any, option?: any) => {
    option = option || {};
    const { headers, ...rest } = option;

    return axios.put(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      ...rest,
    });
  };

  postForm = (url: string, body?: any, option?: any) => {
    option = option || {};
    const { headers, ...rest } = option;

    const result = axios.post(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...formHeader,
        ...headers,
      },
      ...rest,
    });
    return result;
  };

  postURLEncode = (url: string, body?: any, option?: any) => {
    option = option || {};
    const { headers, ...rest } = option;

    const result = axios.post(url, body, {
      ...this.config,
      headers: {
        ...this.headers,
        ...urlEncodeHeader,
        ...headers,
      },
      ...rest,
    });
    return result;
  };

  delete = (url: string, body?: any, option?: any) => {
    option = option || {};
    const { headers, ...rest } = option;
    return axios.delete(url, {
      ...this.config,
      headers: {
        ...this.headers,
        ...headers,
      },
      data: JSON.stringify(body),
      ...rest,
    });
  };
}

export default apiClient;
