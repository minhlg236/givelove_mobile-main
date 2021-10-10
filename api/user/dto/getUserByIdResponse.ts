import { ISuccessHttpResponse } from "../../../interfaces/success_http_response.interface";
import { IUser } from "../../../interfaces/user.interface";

export interface getUserByIdResponse extends ISuccessHttpResponse {
  data: IUser;
}
