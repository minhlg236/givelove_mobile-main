import { useQuery } from "react-query";
import { getAllSponsorInCampaign } from "../../../api/campaign";

const useSponsorInCampaign = (campaignId: string) => {
  return useQuery("sponsorInCampaign", async () => {
    return await getAllSponsorInCampaign(campaignId);
  });
};
export default useSponsorInCampaign;
