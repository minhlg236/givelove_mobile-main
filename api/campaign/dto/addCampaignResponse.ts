import { ICampaign } from "../../../interfaces/campaign.interface";
import { ISuccessHttpResponse } from "../../../interfaces/success_http_response.interface";

export interface addCampaignResponse extends ISuccessHttpResponse {
  data: ICampaign;
}
