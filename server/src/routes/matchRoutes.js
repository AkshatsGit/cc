import express from 'express';
import { getRecommendationsForInfluencer, getRecommendationsForCampaign } from '../controllers/matchController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/influencer/:influencerId?', verifyToken, getRecommendationsForInfluencer);
router.get('/campaign/:campaignId', verifyToken, getRecommendationsForCampaign);

export default router;
