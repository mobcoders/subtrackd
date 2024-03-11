export interface Subscription {
  _id?: string;
  cost: number;
  name: string;
  billingDate: string | Date;
  monthly: boolean;
  active: boolean;
}

export interface Notification {
  _id: string;
  message: string;
  date: Date;
  read: boolean;
}
