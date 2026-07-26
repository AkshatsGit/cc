import express from 'express';
import { getUserNotifications, markNotificationsRead } from '../controllers/notificationController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getUserNotifications);
router.put('/read-all', verifyToken, markNotificationsRead);

export default router;
