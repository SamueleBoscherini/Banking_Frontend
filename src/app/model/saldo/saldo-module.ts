export interface Account {
  account_id: number;
  owner_name: string;
  currency: string;
  createdAt: string;
  balance: number;
}

export interface Transactions    {
  id: number;
  accountId: number;
  type: string; 
  amount: number;
  description: string;
  balanceAfter: number;
  date: string;
}