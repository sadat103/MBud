import { ALL_CONVERSATIONS } from "../constants/apiConstants";
import HttpService from "../../services/HttpService";

export const getAllConversations = async (ID, TOKEN, MODE) => {
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
    const res = await _axios.post(ALL_CONVERSATIONS, requestOptions.body);
    console.log(res.data.conversations);
    if (res.status === 200) {
      return {
        allConversations: res.data.conversations,
        err: null,
      };
    }
  } catch (err) {
    return { allConversations: null, err };
  }
};
