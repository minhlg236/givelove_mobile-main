import { ICampaign } from "../../../interfaces/campaign.interface";
import { IMission } from "../../../interfaces/mission.interface";
import { ISuccessHttpResponse } from "../../../interfaces/success_http_response.interface";

export interface GetTodoListByCampaignIdResponse extends ISuccessHttpResponse {
  data: IMission[];
}
