import express from 'express';
const router = express.Router();
import attendanceController from '../controller/attendance-controller.js';
import { validateEntryExit, validateBiometric } from '../validator/schema.js';

router.get('/attendance', attendanceController.getAttendance);
router.post('/attendance/entry', validateEntryExit, attendanceController.markEntry);
router.post('/attendance/exit', validateEntryExit, attendanceController.markExit);
router.post('/attendance/biometric', validateBiometric, attendanceController.biometricAttendance);

export default router;

