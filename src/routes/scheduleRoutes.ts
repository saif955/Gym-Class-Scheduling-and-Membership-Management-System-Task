import express from "express";
import { authenticateUser, authorizeAdmin, authorizeTrainer } from "../middleware/authMiddleware";
import { getAllSchedules, getAllClassSchedules, createClassSchedule, deleteClassSchedule, updateClassSchedule } from "../controllers/scheduleController";

const router = express.Router();

router.get('/', authenticateUser, authorizeTrainer, getAllClassSchedules)
router.get('/all', authenticateUser, authorizeAdmin, getAllSchedules)
router.post('/', authenticateUser, authorizeAdmin, createClassSchedule)
router.delete('/:id', authenticateUser, authorizeAdmin, deleteClassSchedule)
router.put('/:id', authenticateUser, authorizeAdmin, updateClassSchedule)

export default router;