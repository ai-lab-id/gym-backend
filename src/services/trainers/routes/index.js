import express from 'express';
const router = express.Router();

import trainerController from '../controller/trainer-controller.js';
import { validateCreateTrainer, validateUpdateTrainer } from '../validator/schema.js';
import { authenticate, authorizeRoles } from '../../../middlewares/auth.js';

router.get('/trainers', authenticate, authorizeRoles('Admin'), trainerController.getAllTrainers);
router.post('/trainers', authenticate, authorizeRoles('Admin'), validateCreateTrainer, trainerController.addTrainer);
router.put('/trainers/:id', authenticate, authorizeRoles('Admin'), validateUpdateTrainer, trainerController.updateTrainer);
router.delete('/trainers/:id', authenticate, authorizeRoles('Admin'), trainerController.deleteTrainer);

export default router;
