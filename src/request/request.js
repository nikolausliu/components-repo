import axios from "axios";
import { Toast } from "vant";
import qs from "qs";
const BASE_URL = "https://cnodejs.org/api/v1";

axios.defaults.baseURL = BASE_URL;
axios.interceptors.request.use(
  (config) => {
    Toast.loading({
      duration: 0
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    Toast.clear();
    return res;
  },
  error => {
    Toast.clear();
    return Promise.reject(error);
  }
);

export default {
  BASE_URL,
  get(url, params = {}, config = {}) {
    const temp = Object.assign({}, params, config);
    return axios.get(url, temp);
  },
  post(url, data = {}, config = {}) {
    const postData = Object.assign({}, data);
    return axios.post(
      url,
      qs.stringify(postData),
      Object.assign(
        {},
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        },
        config
      )
    );
  },
  upload(url, data = {}, config = {}) {
    return axios.post(
      url,
      data,
      Object.assign(
        {},
        {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        },
        config
      )
    );
  },
  delete(url, data = {}, config = {}) {
    const temp = Object.assign({}, data, config);
    return axios.delete(url, temp);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  }
};
