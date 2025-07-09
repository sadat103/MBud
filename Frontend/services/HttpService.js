import Axios from "axios";

const HttpMethods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
};

const _axios = Axios.create({
  baseURL: "http://192.168.0.105:4040/",
  headers: {},
});

const getAxiosClient = () => _axios;

const HttpService = {
  HttpMethods,
  getAxiosClient,
};

export default HttpService;
