import { SIGNUP } from "../constants/apiConstants";
import HttpService from "../../services/HttpService";

export const signUp = async (NAME, EMAIL, PASSWORD) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      email: EMAIL,
      password: PASSWORD,
      name: NAME,
    },
  };
  console.log(requestOptions.body);
  try {
    const res = await _axios.post(SIGNUP, requestOptions.body);
    console.log(res);
    if (res.status === 200) {
      return {
        signUpData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { signUpData: null, err: errors.common.msg };
  }
};
