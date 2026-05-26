import express from 'express';
const router = express.Router();
import membershipController from '../controller/membership-controller.js';
import { validateCreateMembership, validateUpdateMembership } from '../validator/schema.js';
import { authenticate, authorizeRoles } from '../../../middlewares/auth.js';

router.get('/memberships', authenticate, authorizeRoles('Admin'), membershipController.getAllMemberships);
router.post('/memberships', authenticate, authorizeRoles('Admin'), validateCreateMembership, membershipController.addMembership);
router.put('/memberships/:id', authenticate, authorizeRoles('Admin'), validateUpdateMembership, membershipController.updateMembership);
router.delete('/memberships/:id', authenticate, authorizeRoles('Admin'), membershipController.deleteMembership);

export default router;
