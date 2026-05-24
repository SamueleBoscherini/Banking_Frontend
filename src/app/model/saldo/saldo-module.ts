export interface Account {
  account_id: number;
  owner_name: string;
  currency: string;
  created_at: string;
  balance: number;
}

export interface Transactions {
  id: number;
  accountId: number;
  type: string;
  amount: number;
  description: string;
  balanceAfter: number;
  created_at: string;
}