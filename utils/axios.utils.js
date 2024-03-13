import axios from "axios";

export const instance = () => {
  const data = axios.create({
    // baseURL: Functions.getBaseURL() + '/api/v1/',
    baseURL: "https://chatbot.thechennaisilks.com:5575/",
    // baseURL: 'https://hdd.augmo.io/api/v1'
  });
  data.interceptors.request.use(async function (config) {
    const accessToken = localStorage.getItem("token");
    config.headers["authorization"] = accessToken;
    return config;
  });
  return data;
};

export default instance;
