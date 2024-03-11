import { Subscription } from '../utils/types';

const BASE_URL = 'https://keepa.fly.dev' || 'http://localhost:3000';

async function fetchSubscriptions() {
  const response = await fetch(`${BASE_URL}/subscriptions`);
  if (!response.ok) throw new Error('Failed to fetch subscriptions');
  return await response.json();
}

async function addSubscription(subscriptionData: Subscription) {
  const response = await fetch(`${BASE_URL}/subscriptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData),
  });
  if (!response.ok) throw new Error('Failed to add subscription');
  return await response.json();
}

async function updateSubscription(id: string, subscriptionData: Subscription) {
  const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(subscriptionData),
  });
  if (!response.ok) throw new Error('Failed to update subscription');
  return await response.json();
}

async function deleteSubscription(id: string) {
  const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete subscription');
  return await response.json();
}

async function fetchNotifications() {
  const response = await fetch(`${BASE_URL}/notifications`);
  if (!response.ok) throw new Error('Failed to fetch notifications');
  return await response.json();
}

export {
  fetchSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
  fetchNotifications,
};
