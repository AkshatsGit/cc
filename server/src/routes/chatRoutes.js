import express from 'express';
import { getConversations, getChatMessages, sendMessage } from '../controllers/chatController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/conversations', verifyToken, getConversations);
router.get('/messages/:chatId', verifyToken, getChatMessages);
router.post('/messages', verifyToken, sendMessage);

export default router;
