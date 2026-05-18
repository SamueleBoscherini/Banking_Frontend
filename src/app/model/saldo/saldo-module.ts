export interface Account {
  id: number;
  name: string;
  currency: string;
  createdAt: string;
}

export interface Transaction    {
  id: number;
  accountId: number;
  type: string; 
  amount: number;
  description: string;
  balanceAfter: number;
  date: string;
}