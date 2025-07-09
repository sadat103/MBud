import { ADD_CONVERSATIONS } from "../constants/apiConstants";
import HttpService from "../../services/HttpService";

export const addNewCon = async (ID, TOKEN, MODE) => {
  const _axios = HttpService.getAxiosClient();
  const requestOptions = {
    body: {
      id: ID,
      token: TOKEN,
      mode: MODE,
    },
  };
  console.log(requestOptions.body);
  try {
    const res = await _axios.post(ADD_CONVERSATIONS, requestOptions.body);
    console.log("here response", res.data.data);
    if (res.status === 200) {
      return {
        newConv: res.data.data,
        err: null,
      };
    }
  } catch (err) {
    return { newConv: null, err };
  }
};
