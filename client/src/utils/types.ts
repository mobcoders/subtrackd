interface Subscription {
  _id?: string;
  cost: number;
  name: string;
  billingDate: string | Date;
  monthly: boolean;
  active: boolean;
}

interface Notification {
  _id: string;
  message: string;
  date: Date;
  read: boolean;
}

export type { Subscription, Notification };
