import express from "express";
import { createTrainee, login, updateTrainee, deleteTrainee, getAllTrainees } from "../controllers/userController";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/', createTrainee);
router.post('/login', login);
router.get('/', authenticateUser, authorizeAdmin, getAllTrainees);
router.put('/:id',authenticateUser, updateTrainee);
router.delete('/:id',authenticateUser, deleteTrainee);

export default router;
