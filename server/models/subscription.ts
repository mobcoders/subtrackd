import {Schema, model} from 'mongoose';

interface ISubscription {
    name: string;
    cost: number;
    billingDate: Date;
    status: string;
    billingCycle: string;
}

const subscriptionSchema = new Schema<ISubscription>({
 name: {type: String, required: true},
 cost: {type: Number, required: true},
 billingDate: {type: Date, required: true},
 status: {type: String, required: true},
 billingCycle: {type: String, required: true},
});

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

module.exports = Subscription;