import express from 'express';
import { getBrandProfile, updateBrandProfile, getBrandDashboard } from '../controllers/brandController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', verifyToken, checkRole(['brand', 'admin']), getBrandDashboard);
router.get('/profile/:id', getBrandProfile);
router.put('/profile', verifyToken, checkRole(['brand', 'admin']), updateBrandProfile);

export default router;
