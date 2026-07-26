import express from 'express';
import {
  applyToCampaign,
  getCampaignApplicants,
  updateApplicationStatus,
  withdrawApplication
} from '../controllers/applicationController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/apply', verifyToken, checkRole(['influencer', 'admin']), applyToCampaign);
router.get('/campaign/:campaignId', verifyToken, getCampaignApplicants);
router.put('/:id/status', verifyToken, checkRole(['brand', 'admin']), updateApplicationStatus);
router.delete('/:id', verifyToken, checkRole(['influencer', 'admin']), withdrawApplication);

export default router;
