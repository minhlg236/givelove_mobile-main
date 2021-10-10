import { useQuery } from "react-query";
import { getTodoListByCampaignId } from "../../../api/campaign";

const useTodoListByCampaignId = (campaignId: string) => {
  return useQuery("todoListByCampaignId", async () => {
    return await getTodoListByCampaignId(campaignId);
  });
};
export default useTodoListByCampaignId;
