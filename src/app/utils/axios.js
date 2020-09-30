import axios from "axios";

const instance = axios.create({
  baseURL: "https://staging.api.fusionloopsolution.com",
});

export default instance;
