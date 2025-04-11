import express from "express";
import { createTrainee, login,  } from "../controllers/userController";

const router = express.Router();

router.post('/', createTrainee);
router.post('/login', login);

export default router;
