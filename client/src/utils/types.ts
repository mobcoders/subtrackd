export interface Subscription {
  _id?: string;
  status: string;
  cost: number;
  name: string;
  billingDate: string;
  endDate: string;
  isActive: boolean;
}