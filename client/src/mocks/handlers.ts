import { http, HttpResponse } from 'msw';

const mockSubscriptions = [
  {
    _id: '65eb1db8887f8d91fc701711',
    name: 'Netflix',
    cost: 12,
    billingDate: '2024-03-08T12:42:35.587Z',
    status: true,
    billingCycle: 'Monthly',
    __v: 0,
  },
  {
    _id: '65eb1db8887f8d91fc701712',
    name: 'Spotify',
    cost: 5,
    billingDate: '2024-03-08T12:42:35.587Z',
    status: true,
    billingCycle: 'Monthly',
    __v: 0,
  },
  {
    _id: '65eb1db8887f8d91fc701713',
    name: 'Disney',
    cost: 7,
    billingDate: '2024-03-08T12:42:35.587Z',
    status: true,
    billingCycle: 'Monthly',
    __v: 0,
  },
];

export const handlers = [
  http.get('https://keepa.fly.dev/subscriptions', () => {
    return HttpResponse.json(mockSubscriptions);
  }),
];
