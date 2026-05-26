import express from 'express';
const router = express.Router();
import authController from '../controller/auth-controller.js';
import { validateLogin } from '../validator/schema.js';

router.post('/auth/login', validateLogin, authController.login);

export default router;
