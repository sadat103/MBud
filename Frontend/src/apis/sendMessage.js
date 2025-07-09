import { SEND_MESSAGE } from "../constants/apiConstants";
import HttpService from "../../services/HttpService";

export const messageSendPost = async (ID, CONV_ID, MODE, MESSAGE, TOKEN) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      id: ID,
      token: TOKEN,
      mode: MODE,
      conv_id: CONV_ID,
      message: MESSAGE,
    },
  };
  console.log("messagebody", requestOptions.body);
  try {
    const res = await _axios.post(SEND_MESSAGE, requestOptions.body);
    if (res.status === 200) {
      return {
        messageData: res.data,
        err: null,
      };
    }
  } catch (err) {
    return { messageData: null, err };
  }
};
