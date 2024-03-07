export interface Subscription {
  _id?: string;
  status: string;
  cost: number;
  name: string;
  billingDate: Date;
  endDate: string;
  isActive: boolean;
}
