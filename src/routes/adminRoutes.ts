import express from "express";
import { createTrainer, updateTrainer, deleteTrainer } from "../controllers/adminController";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/', authenticateUser, authorizeAdmin, createTrainer);
router.put('/:id', authenticateUser, authorizeAdmin, updateTrainer);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteTrainer);

export default router;

