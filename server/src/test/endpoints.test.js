import {
  beforeAll,
  expect,
  test,
  describe,
  it,
  afterEach,
  afterAll,
} from 'vitest';
import express from 'express';
import { router } from '../router';
import supertest from 'supertest';

import { mongoose } from 'mongoose';
import { Subscription } from '../models/subscription';
import { Notification } from '../models/notification';

const databaseName = 'testSubscriptions';

const mockSubscription = {
  _id: '65eb1db8887f8d91fc701712',
  name: 'Netflix',
  cost: 12,
  billingDate: '2024-03-08T12:42:35.587Z',
  status: true,
  billingCycle: 'Monthly',
  __v: 0,
};

const mockSubscriptionUpdate = {
  name: 'Spotify',
  cost: 15,
  billingDate: '2024-03-08T12:42:35.587Z',
  status: true,
  billingCycle: 'Monthly',
};

const mockNotification = {
  message: 'Hey gurl',
  date: '2024-03-08T12:42:35.587Z',
  read: false,
};

describe('Endpoints test', () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;

    await mongoose
      .connect(url)
      .then(() => console.log('MongoDB connected'))
      .catch((err) => console.error('Could not connect to MongoDB...', err));

    const notification = new Notification(mockNotification);
    await notification.save();
  });

  afterAll(async () => {
    await Subscription.deleteMany();
  });

  it('should get an empty array of subscriptions from the database', async () => {
    const res = await request.get('/subscriptions');

    expect(res.body).toStrictEqual([]);
  });

  it('should return the posted subscription in the body', async () => {
    const res = await request.post('/subscriptions').send(mockSubscription);
    expect(res.body.name).toStrictEqual(mockSubscription.name);
    expect(res.body.cost).toStrictEqual(mockSubscription.cost);
    expect(res.body.billingDate).toStrictEqual(mockSubscription.billingDate);
    expect(res.body.status).toStrictEqual(mockSubscription.status);
    expect(res.body.billingCycle).toStrictEqual(mockSubscription.billingCycle);
  });

  it('should return the subscriptions in the database', async () => {
    const res = await request.get('/subscriptions');
    expect(res.body[0].name).toStrictEqual(mockSubscription.name);
    expect(res.body[0].cost).toStrictEqual(mockSubscription.cost);
    expect(res.body[0].billingDate).toStrictEqual(mockSubscription.billingDate);
    expect(res.body[0].status).toStrictEqual(mockSubscription.status);
    expect(res.body[0].billingCycle).toStrictEqual(
      mockSubscription.billingCycle
    );
  });

  it('should return the updated subscription in the body and update DB', async () => {
    const resPut = await request
      .put(`/subscriptions/${mockSubscription._id}`)
      .send(mockSubscriptionUpdate);
    expect(resPut.body.name).toStrictEqual(mockSubscriptionUpdate.name);
    expect(resPut.body.cost).toStrictEqual(mockSubscriptionUpdate.cost);
    expect(resPut.body.billingDate).toStrictEqual(
      mockSubscriptionUpdate.billingDate
    );
    expect(resPut.body.status).toStrictEqual(mockSubscriptionUpdate.status);
    expect(resPut.body.billingCycle).toStrictEqual(
      mockSubscriptionUpdate.billingCycle
    );

    const resDB = await request.get('/subscriptions');
    expect(resDB.body[0].name).toStrictEqual(mockSubscriptionUpdate.name);
    expect(resDB.body[0].cost).toStrictEqual(mockSubscriptionUpdate.cost);
    expect(resDB.body[0].billingDate).toStrictEqual(
      mockSubscriptionUpdate.billingDate
    );
    expect(resDB.body[0].status).toStrictEqual(mockSubscriptionUpdate.status);
    expect(resDB.body[0].billingCycle).toStrictEqual(
      mockSubscriptionUpdate.billingCycle
    );
  });

  it('should delete the subscription in the DB by ID', async () => {
    const res = await request.delete(`/subscriptions/${mockSubscription._id}`);
    const resDB = await request.get('/subscriptions');
    expect(resDB.body).toStrictEqual([]);
  });

  it('should get notifications from the DB', async () => {
    const res = await request.get('/notifications');

    expect(res.body[0].message).toStrictEqual(mockNotification.message);
    expect(res.body[0].date).toStrictEqual(mockNotification.date);
    expect(res.body[0].read).toStrictEqual(mockNotification.read);
  });
});
