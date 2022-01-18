import axios, { AxiosResponse } from "axios";
import { PROFILE_USER_URL } from "../../config/default";
import { AUTH_USER_URL } from "./../../config/default";
import { basicErrorRoutes } from "../../pages/utils/errors/ErrorsRouter";
import { accessRoutes } from "./../../pages/utils/errors/ErrorsRouter";
axios.defaults.withCredentials = true;

export const helperErrorMessge = (resMsg: string, msg: string) => {
  return resMsg === msg;
};

export const checkBasicErrors = (resMsg: string) => {
  for (let i = 0; i < basicErrorRoutes.length; i++) {
    const n = basicErrorRoutes[i];
    if (helperErrorMessge(resMsg, n.text)) {
      window.location.href = `/errors${n.path}`;
      return null;
    }
  }
  return true;
};

export const checkForbiddenError = (resMsg: string) => {
  for (let i = 0; i < accessRoutes.length; i++) {
    const n = accessRoutes[i];
    if (helperErrorMessge(resMsg, n.text)) {
      window.location.href = `/errors${n.path}`;
      return null;
    }
  }
  return true;
};

export const networkError = () => {
  window.location.href = "/errors/network";
  return null;
};
export const basicErrors = (res: AxiosResponse) => {
  const message = res.data.message[0];
  const flag = checkBasicErrors(message);
  if (!flag) return null;
  return res;
};
export const basicAndForbiddenErrors = (res: AxiosResponse) => {
  const message = res.data.message[0];
  let flag = checkForbiddenError(message);
  if (!flag) return null;
  flag = checkBasicErrors(message);
  if (!flag) return null;
  return res;
};

export const userProfileAccessInstance = axios.create({
  baseURL: PROFILE_USER_URL,
});

export const userAuthAccessInstance = axios.create({
  baseURL: AUTH_USER_URL,
});

export const userAuthInstance = axios.create({
  baseURL: AUTH_USER_URL,
});

userAuthInstance.interceptors.response.use(res => basicErrors(res), networkError);

userAuthAccessInstance.interceptors.response.use(res => basicAndForbiddenErrors(res), networkError);

userProfileAccessInstance.interceptors.response.use(res => basicAndForbiddenErrors(res), networkError);
