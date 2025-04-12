import { Request, Response } from 'express';
import User from "../models/Users";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from '../utils/jwt';
import {
    successResponse,
    validationErrorResponse,
    unauthorizedResponse
} from "../utils/responseHandler";
import { TraineeRequestBody, LoginRequestBody, IUser} from '../types/userTypes';


export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find trainee by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json(
                unauthorizedResponse('Invalid credentials')
            );
        }

        // Check password
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json(
                unauthorizedResponse('Invalid credentials')
            );
        }

        // Generate token
        const token = generateToken(user);

        res.status(200).json(
            successResponse('Login successful', {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            })
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};

export const createTrainee = async (req: Request<{}, {}, TraineeRequestBody>, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json(
                validationErrorResponse('trainee', 'All fields are required')
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json(
                validationErrorResponse('email', 'Invalid email format')
            );
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        const trainee = new User({
            name,
            email,
            password: hashedPassword,
            role: 'trainee'
        });
        await trainee.save();

        // Generate token
        const token = generateToken(trainee);

        res.status(201).json(
            successResponse('Trainee created successfully', {
                token,
                trainee: {
                    id: trainee._id,
                    name: trainee.name,
                    email: trainee.email,
                    role: trainee.role
                }
            }, 201)
        );
    } catch (error) {
        if ((error as any).code === 11000) {
            return res.status(400).json(
                validationErrorResponse('email', 'Email already exists')
            );
        }
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};

