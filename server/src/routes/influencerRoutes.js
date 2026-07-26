import express from 'express';
import { getInfluencerProfile, updateInfluencerProfile, getInfluencerDashboard } from '../controllers/influencerController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', verifyToken, checkRole(['influencer', 'admin']), getInfluencerDashboard);
router.get('/profile/:id', getInfluencerProfile);
router.put('/profile', verifyToken, checkRole(['influencer', 'admin']), updateInfluencerProfile);

export default router;
