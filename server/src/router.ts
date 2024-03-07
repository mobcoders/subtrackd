import express from 'express';
export const router = express.Router();
import { getSubs, addSub, editSub, deleteSub, getNotification } from './controllers/controllers';

router.get('/subscriptions', getSubs);
router.post('/subscriptions', addSub);
router.put('/subscriptions/:id', editSub)
router.delete('/subscriptions/:id', deleteSub)
router.get('/notifications', getNotification)

