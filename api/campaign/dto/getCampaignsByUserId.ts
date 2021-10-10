import { ICampaign } from "../../../interfaces/campaign.interface";
import { ISuccessHttpResponse } from "../../../interfaces/success_http_response.interface";

export interface GetCampaignsByUserIdResponse extends ISuccessHttpResponse {
  data: ICampaign[];
}
