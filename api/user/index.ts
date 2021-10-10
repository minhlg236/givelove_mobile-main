import { API } from "../axios";
import { getUserByIdResponse } from "./dto/getUserByIdResponse";

export const getUserByUserId = (userId: string) => {
  return API.get<getUserByIdResponse>(`user/${userId}`);
};
