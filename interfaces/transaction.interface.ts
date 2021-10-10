export interface ITransaction {
  date: string;
  datetime: string;
  money: number;
  nonce: number;
  previous_hash: string;
  user_id: number;
  campaign_id: number;
}
