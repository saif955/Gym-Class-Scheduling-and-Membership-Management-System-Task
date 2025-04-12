import express from "express";
import { enrollSchedule, getProfile, updateProfile,deleteProfile } from "../controllers/traineeController";
import { getAllSchedules } from "../controllers/scheduleController";
import { authenticateUser, authorizeAdmin,authorizeTrainee } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/enroll', authenticateUser, authorizeTrainee, enrollSchedule);
router.get('/profile', authenticateUser, authorizeTrainee, getProfile);
router.get('/schedules', authenticateUser, authorizeTrainee, getAllSchedules);
router.put('/profile', authenticateUser, authorizeTrainee, updateProfile);
router.delete('/profile', authenticateUser, authorizeTrainee, deleteProfile);
export default router;