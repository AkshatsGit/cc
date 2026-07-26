import express from 'express';
import {
  getAdminStats,
  toggleUserBan,
  toggleVerificationBadge,
  moderateReport,
  submitReport
} from '../controllers/adminController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', verifyToken, checkRole(['admin']), getAdminStats);
router.put('/users/:userId/ban', verifyToken, checkRole(['admin']), toggleUserBan);
router.put('/verify/:id', verifyToken, checkRole(['admin']), toggleVerificationBadge);
router.put('/reports/:id', verifyToken, checkRole(['admin']), moderateReport);
router.post('/reports', verifyToken, submitReport);

export default router;
