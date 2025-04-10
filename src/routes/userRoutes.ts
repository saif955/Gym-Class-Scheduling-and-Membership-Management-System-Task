import express from "express";
import { createUser, login, updateUser, deleteUser, getAllUsers } from "../controllers/userController";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post('/', createUser);
router.post('/login', login);
router.get('/', authenticateUser, authorizeAdmin, getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
