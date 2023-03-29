import { ExplicitAny } from "../../type/global";

const axios = require('axios').default;


const axiosInstance = axios.create({
  timeout: 500,
});

const baseURL = "https://challenge.surfe.com";

const httpClient = () => {
  axiosInstance.interceptors.request.use((config: ExplicitAny) => ({
    ...config,
    baseURL,
  }));

  return axiosInstance;
};

export default httpClient;
