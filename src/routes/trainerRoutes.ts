import express from "express";
import { authenticateUser, authorizeAdmin, authorizeTrainer } from "../middleware/authMiddleware";
import { getAllClassSchedules, createClassSchedule } from "../controllers/trainerController";
const router = express.Router();

router.get('/', authenticateUser, authorizeTrainer, getAllClassSchedules)
router.post('/', authenticateUser, authorizeAdmin, createClassSchedule)
export default router;