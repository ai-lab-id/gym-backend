import express from 'express';
const router = express.Router();
import {
  authRoutes,
  dashboardRoutes,
  memberRoutes,
  membershipRoutes,
  trainerRoutes,
  attendanceRoutes,
  paymentRoutes,
} from '../services/index.js';

router.use('/', authRoutes);
router.use('/', dashboardRoutes);
router.use('/', memberRoutes);
router.use('/', membershipRoutes);
router.use('/', trainerRoutes);
router.use('/', attendanceRoutes);
router.use('/', paymentRoutes);

export default router;
