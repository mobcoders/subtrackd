export interface Subscription {
  _id?: string;
  cost: number;
  name: string;
  billingDate: Date;
  endDate: Date;
  isActive: boolean;
}

export interface Notification {
  _id: string;
  message: string;
  date: Date;
  read: boolean;
}
