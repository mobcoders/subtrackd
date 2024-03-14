import express from 'express';
export const router = express.Router();
import { getSubs, addSub, editSub, deleteSub, getNotification } from './controllers/controllers';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const config = {
  clerkSecretKey: process.env.CLERK_SECRET_KEY,
}

router.get('/subscriptions/:userid', ClerkExpressRequireAuth(), getSubs);
router.post('/subscriptions/:userid',ClerkExpressRequireAuth(), addSub);
router.put('/subscriptions/:id/:userid',ClerkExpressRequireAuth() ,editSub)
router.delete('/subscriptions/:id/:userid',ClerkExpressRequireAuth(), deleteSub)
router.get('/notifications/:userid',ClerkExpressRequireAuth() ,getNotification)

