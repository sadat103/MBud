import {
  FB_TOKEN_VALIDATE,
  GOOGLE_TOKEN_VALIDATE,
} from "../constants/apiConstants";
import HttpService from "../../services/HttpService";

export const tokenValid = async (ID, TOKEN, MODE) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      user_id: ID,
      token: TOKEN,
      mode: MODE,
    },
  };
  try {
    const res = await _axios.post(GOOGLE_TOKEN_VALIDATE, requestOptions.body);
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

export const tokenValidFb = async (TOKEN) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      token: TOKEN,
    },
  };
  try {
    const res = await _axios.post(FB_TOKEN_VALIDATE, requestOptions.body);

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
