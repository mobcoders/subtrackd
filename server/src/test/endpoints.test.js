import { beforeAll, expect, test, describe, it, afterEach } from "vitest";
import express from "express";
import { router } from "../router";
import supertest from "supertest";

import { mongoose } from "mongoose";
import { Subscription } from "../models/subscription";

const databaseName = "testSubscriptions";

const mockSubscription = {
  name: "Netflix",
  cost: 12,
  billingDate: "2024-03-08T12:42:35.587Z",
  status: true,
  billingCycle: "Monthly",
};

describe("Endpoints test", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  const request = supertest(app);

  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/${databaseName}`;
    await mongoose.connect(url);
  });

  afterEach(async () => {
    await Subscription.deleteMany();
  });

  it("should get an empty array of subscriptions from the database", async () => {
    const res = await request.get("/subscriptions");

    expect(res.body).toStrictEqual([]);
  });

  it("should sdd subscription to the database", async () => {
    const res = await request.post("/subscriptions").send(mockSubscription);
    expect(res.body.name).toStrictEqual(mockSubscription.name);
    expect(res.body.cost).toStrictEqual(mockSubscription.cost);
    expect(res.body.billingDate).toStrictEqual(mockSubscription.billingDate);
    expect(res.body.status).toStrictEqual(mockSubscription.status);
    expect(res.body.billingCycle).toStrictEqual(mockSubscription.billingCycle);
  });

  // console.log("res.body: ", res.body);
});
