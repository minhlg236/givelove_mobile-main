import { ISuccessHttpResponse } from "../../../interfaces/success_http_response.interface";
import { IUser } from "../../../interfaces/user.interface";

export interface LoginDto {
  username: string;
  password: string;
}
export interface LoginResponse extends ISuccessHttpResponse {
  data: { jwt: string; userId: string; role: string };
}
