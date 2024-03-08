import { Subscription } from "../utils/types";

const BASE_URL = 'https://keepa.fly.dev' ||'http://localhost:3000';

const apiService = {
  fetchSubscriptions: async () => {
    const response = await fetch(`${BASE_URL}/subscriptions`);
    if (!response.ok) throw new Error('Failed to fetch subscriptions');
    return await response.json();
  },

  addSubscription: async (subscriptionData : Subscription) => {
    const response = await fetch(`${BASE_URL}/subscriptions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionData),
    });
    if (!response.ok) throw new Error('Failed to add subscription');
    return await response.json();
  },

  updateSubscription: async (id:string, subscriptionData: Subscription) => {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subscriptionData),
    });
    if (!response.ok) throw new Error('Failed to update subscription');
    return await response.json();
  },

  deleteSubscription: async (id:string) => {
    const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete subscription');
    return await response.json();
  },

  fetchNotifications: async () => {
    const response = await fetch(`${BASE_URL}/notifications`); 
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return await response.json();
  },
};

export default apiService;
