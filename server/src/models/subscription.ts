import mongoose, { Schema } from "mongoose";

export interface ISubscription {
  name: string;
  cost: number;
  billingDate: Date;
  status: boolean;
  billingCycle: string;
}

const subscriptionSchema = new Schema<ISubscription>({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  billingDate: { type: Date, required: true },
  status: { type: Boolean, required: true },
  billingCycle: { type: String, required: true },
});

export const Subscription = mongoose.model<ISubscription>(
  "Subscription",
  subscriptionSchema,
);
