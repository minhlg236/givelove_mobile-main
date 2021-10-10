import { API } from "../axios/index";
import { LoginDto, LoginResponse } from "./dto/login.dto";

export const login = async (requestData: LoginDto) => {
  const { data } = await API.post<LoginResponse>("/auth/login", requestData);
  return data.data;
};
