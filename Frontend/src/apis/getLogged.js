import {
  FB_LOGGED_IN,
  FB_TOKEN_VALIDATE,
  GOOGLE_LOGGED_IN,
  LOGGEDIN,
} from "../constants/apiConstants";
import HttpService from "../../services/HttpService";

export const getLogged = async () => {
  const _axios = HttpService.getAxiosClient();
  try {
    const res = await _axios.get(LOGGEDIN);
    console.log(res);
    if (res.status === 200) {
      return {
        loggedData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { loggedData: null, err };
  }
};

export const googleLoggedIn = async (TOKEN, REFRESH_TOKEN) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      token: TOKEN,
      refresh_token: REFRESH_TOKEN,
    },
  };
  console.log(requestOptions.body);
  try {
    const res = await _axios.post(GOOGLE_LOGGED_IN, requestOptions.body);
    console.log(res);
    if (res.status === 200) {
      return {
        loggedData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { loggedData: null, err };
  }
};

export const fbLoggedIn = async (TOKEN) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      token: TOKEN,
    },
  };
  console.log(requestOptions.body);
  try {
    const res = await _axios.post(FB_LOGGED_IN, requestOptions.body);
    console.log(res);
    if (res.status === 200) {
      return {
        authData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { authData: null, err };
  }
};
