import { useQuery } from "react-query";
import {
  getAllMemberInCampaign,
  getTodoListByCampaignId,
} from "../../../api/campaign";

const useMemberInCampaign = (campaignId: string) => {
  return useQuery("memberInCampaign", async () => {
    return await getAllMemberInCampaign(campaignId);
  });
};
export default useMemberInCampaign;
