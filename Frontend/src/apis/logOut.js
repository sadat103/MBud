import HttpService from "../../services/HttpService";
import { FB_LOGOUT, GOOGLE_LOGOUT } from "../constants/apiConstants";

export const logOUT = async (NAME) => {
  const _axios = HttpService.getAxiosClient();

  try {
    const res = await _axios.delete();
    console.log(res.data);
    if (res.status === 200) {
      return {
        logoutData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { logoutData: null, err };
  }
};

export const googlelogOUT = async (TOKEN) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      token: TOKEN,
    },
  };
  try {
    const res = await _axios.post(GOOGLE_LOGOUT, requestOptions.body);
    console.log(res.data);
    if (res.status === 200) {
      return {
        logoutData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { logoutData: null, err };
  }
};

export const fblogOUT = async (TOKEN) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      token: TOKEN,
    },
  };
  console.log("payload", requestOptions.body);
  try {
    const res = await _axios.post(FB_LOGOUT, requestOptions.body);
    console.log("here", res);
    if (res.status === 200) {
      return {
        logoutData: res.data,
        err: null,
      };
    }
  } catch (err) {
    console.log("error", err);
    return { logoutData: null, err };
  }
};
