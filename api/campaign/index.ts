import { ICampaign } from "../../interfaces/campaign.interface";
import { API } from "../axios/index";
import { addCampaignResponse } from "./dto/addCampaignResponse";
import { GetCampaignsByUserIdResponse } from "./dto/getCampaignsByUserId";
import { GetAllMemberInCampaignResponse } from "./dto/getMemberInCampaignResponse";
import { GetTodoListByCampaignIdResponse } from "./dto/getTodoListByCampaignId";

export const getCampainByUserId = async (userId: string) => {
  const { data } = await API.get<GetCampaignsByUserIdResponse>(
    `campaign/${userId}`
  );
  return data;
};
export const getCampainByManagerId = async (managerId: string) => {
  const { data } = await API.get<GetCampaignsByUserIdResponse>(
    `campaign/manager/${managerId}`
  );
  return data;
};
export const getTodoListByCampaignId = async (campaignId: string) => {
  const { data } = await API.get<GetTodoListByCampaignIdResponse>(
    `task?campaignId=${campaignId}`
  );
  return data;
};
export const getAllMemberInCampaign = async (campaignId: string) => {
  const { data } = await API.get<GetAllMemberInCampaignResponse>(
    `user/usersInCampaign/${campaignId}`
  );
  return data;
};
export const getAllSponsorInCampaign = async (campaignId: string) => {
  const { data } = await API.get<GetAllMemberInCampaignResponse>(
    `user/donatorInCampaign/${campaignId}`
  );
  return data;
};
export const addCampaign = async (campaign: ICampaign) => {
  const { data } = await API.post<addCampaignResponse>(
    "campaign/add",
    campaign
  );
};
