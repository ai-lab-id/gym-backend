import express from 'express';
const router = express.Router();
import memberController from '../controller/member-controller.js';
import { validateCreateMember, validateUpdateMember, validateMemberFingerprint } from '../validator/schema.js';
import { authenticate, authorizeRoles } from '../../../middlewares/auth.js';

router.get('/members', authenticate, authorizeRoles('Admin'), memberController.getAllMembers);
router.get('/members/:id', authenticate, authorizeRoles('Admin'), memberController.getMemberById);
router.post('/members', authenticate, authorizeRoles('Admin'), validateCreateMember, memberController.addMember);
router.put('/members/:id', authenticate, authorizeRoles('Admin'), validateUpdateMember, memberController.updateMember);
router.delete('/members/:id', authenticate, authorizeRoles('Admin'), memberController.deleteMember);
router.post('/members/:id/fingerprint', authenticate, authorizeRoles('Admin'), validateMemberFingerprint, memberController.registerFingerprint);

export default router;

