import { OTP_VERIFY } from "../constants/apiConstants";
import HttpService from "../../services/HttpService";

export const otpPost = async (ID, OTP) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      user_id: ID,
      otp: OTP,
    },
  };
  console.log(requestOptions.body);
  try {
    const res = await _axios.post(OTP_VERIFY, requestOptions.body);
    if (res.status === 200) {
      return {
        otpData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { otpData: null, err: errors.common.msg };
  }
};
