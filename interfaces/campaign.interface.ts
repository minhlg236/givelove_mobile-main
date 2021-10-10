export interface ICampaign {
  id?: number;
  startDate: Date;
  endDate: Date;
  location: string;
  total: number;
  totalExpenses?: number;
  remainMoney?: number;
  description?: string;
  name: string;
  state?: string;
  image?: string;
  manager: string;
  totalMember?: number;
}
