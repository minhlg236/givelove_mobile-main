import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const API = axios.create({
  baseURL: "http://localhost:8080/",
});

API.interceptors.request.use(
  async (config) => {
    const promise = await AsyncStorage.getItem("token");
    config.headers.Authorization = promise;
    return config;
  },
  (error) => Promise.reject(error)
);
export { API };
