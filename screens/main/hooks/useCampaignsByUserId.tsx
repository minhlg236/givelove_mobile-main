import { useQuery } from "react-query";
import { getCampainByUserId } from "../../../api/campaign";

const useCampaignsByUserId = (userId: string) => {
  return useQuery("campaignsByUserId", async () => {
    return await getCampainByUserId(userId);
  });
};

export default useCampaignsByUserId;
