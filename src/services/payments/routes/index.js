import express from 'express';
const router = express.Router();
import paymentController from '../controller/payment-controller.js';
import { validateCreatePayment } from '../validator/schema.js';
import { authenticate, authorizeRoles } from '../../../middlewares/auth.js';

router.get('/payments', authenticate, authorizeRoles('Admin'), paymentController.getPayments);
router.post('/payments', authenticate, authorizeRoles('Admin'), validateCreatePayment, paymentController.addPayment);

export default router;
