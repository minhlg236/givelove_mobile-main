import { useQuery } from "react-query";
import { getCampainByManagerId } from "../../../api/campaign";
const useCampaignsByManagerId = (managerId: string) => {
  return useQuery("campaignsByManagerId", async () => {
    return await getCampainByManagerId(managerId);
  });
};

export default useCampaignsByManagerId;
