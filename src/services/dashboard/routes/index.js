import { Router } from 'express';
import dashboardController from '../controller/dashboard-controller.js';
import { authenticate, authorizeRoles } from '../../../middlewares/auth.js';

const router = Router();

router.get('/dashboard', authenticate, authorizeRoles('Admin'), dashboardController.getDashboardData);

export default router;
