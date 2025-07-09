import { LOGIN } from "../constants/apiConstants";
import HttpService from "../../services/HttpService";

export const postLogin = async (NAME) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      name: NAME,
    },
  };
  console.log(requestOptions.body);
  try {
    const res = await _axios.post(LOGIN, requestOptions.body);
    if (res.status === 200) {
      return {
        loginData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { loginData: null, err };
  }
};

export const logIn = async (NAME, PASSWORD) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      email: NAME,
      password: PASSWORD,
    },
  };
  console.log("here", requestOptions.body);
  try {
    const res = await _axios.post(LOGIN, requestOptions.body);
    console.log(res.data);
    if (res.status === 200) {
      return {
        loginData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { loginData: null, err };
  }
};
