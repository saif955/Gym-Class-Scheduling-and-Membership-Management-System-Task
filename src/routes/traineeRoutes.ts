import express from "express";
import { enrollSchedule, getProfile } from "../controllers/traineeController";
import { authenticateUser, authorizeAdmin,authorizeTrainee } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/enroll', authenticateUser, authorizeTrainee, enrollSchedule);
router.get('/profile', authenticateUser, authorizeTrainee, getProfile);

export default router;