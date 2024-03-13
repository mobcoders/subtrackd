import { Subscription } from '../utils/types';

const BASE_URL = 'http://localhost:3000';

async function fetchSubscriptions(userId: string, token: string) {
  const response = await fetch(`${BASE_URL}/subscriptions/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error('Failed to fetch subscriptions');
  return await response.json();
}

async function addSubscription(
  subscriptionData: Subscription,
  userId: string,
  token: string,
) {
  const response = await fetch(`${BASE_URL}/subscriptions/${userId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionData),
  });
  if (!response.ok) throw new Error('Failed to add subscription');
  return await response.json();
}

async function updateSubscription(
  id: string,
  subscriptionData: Subscription,
  token: string,
) {
  const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subscriptionData),
  });
  if (!response.ok) throw new Error('Failed to update subscription');
  return await response.json();
}

async function deleteSubscription(id: string, token: string) {
  const response = await fetch(`${BASE_URL}/subscriptions/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  if (!response.ok) throw new Error('Failed to delete subscription');
  return await response.json();
}

async function fetchNotifications(userId: string, token: string) {
  const response = await fetch(`${BASE_URL}/notifications/${userId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
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
