import express from 'express';
import {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
  toggleBookmark,
  getBookmarks
} from '../controllers/campaignController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verifyToken, getCampaigns);
router.get('/bookmarks', verifyToken, getBookmarks);
router.post('/bookmark', verifyToken, toggleBookmark);
router.get('/:id', verifyToken, getCampaignById);
router.post('/', verifyToken, checkRole(['brand', 'admin']), createCampaign);
router.put('/:id', verifyToken, checkRole(['brand', 'admin']), updateCampaign);
router.delete('/:id', verifyToken, checkRole(['brand', 'admin']), deleteCampaign);

export default router;
