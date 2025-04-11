import express from "express";
import { createTrainee, login, updateTrainee, deleteTrainee, getAllTrainees } from "../controllers/userController";
import { authenticateUser, authorizeAdmin,authorizeTrainee } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/', createTrainee);
router.post('/login', login);
// router.get('/', authenticateUser, authorizeAdmin, getAllTrainees);
router.put('/:id',authenticateUser,authorizeTrainee, updateTrainee);
router.delete('/:id',authenticateUser,authorizeTrainee,deleteTrainee);

export default router;
