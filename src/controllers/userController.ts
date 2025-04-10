import { Request, Response } from 'express';
import User, { IUser } from "../models/Users";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from '../utils/jwt';
import {
  successResponse,
  validationErrorResponse,
  unauthorizedResponse
} from "../utils/responseHandler";

interface TraineeRequestBody {
    name: string;
    email: string;
    password: string;
}

interface LoginRequestBody {
    email: string;
    password: string;
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find trainee by email
        const trainee = await User.findOne({ email });
        if (!trainee) {
            return res.status(401).json(
                unauthorizedResponse('Invalid credentials')
            );
        }

        // Check password
        const isMatch = await comparePassword(password, trainee.password);
        if (!isMatch) {
            return res.status(401).json(
                unauthorizedResponse('Invalid credentials')
            );
        }

        // Generate token
        const token = generateToken(trainee);

        res.status(200).json(
            successResponse('Login successful', {
                token,
                trainee: {
                    id: trainee._id,
                    name: trainee.name,
                    email: trainee.email,
                    role: trainee.role
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

export const getAllTrainees = async (req: Request, res: Response) => {
    try {
        const trainees = await User.find({ role: 'trainee' }).select('-password');
        res.status(200).json(
            successResponse('Trainees retrieved successfully', trainees)
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};

export const getTraineeById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const trainee = await User.findOne({ 
            _id: req.params.id,
            role: 'trainee'
        }).select('-password');
        if (!trainee) {
            return res.status(404).json(
                successResponse('Trainee not found', null, 404)
            );
        }
        res.status(200).json(
            successResponse('Trainee retrieved successfully', trainee)
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};

export const updateTrainee = async (req: Request<{ id: string }, {}, TraineeRequestBody>, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const traineeId = req.params.id;

        // Validate email format if email is being updated
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json(
                    validationErrorResponse('email', 'Invalid email format')
                );
            }
        }

        const updateData: any = { name, email };
        if (password) {
            updateData.password = await hashPassword(password);
        }

        const trainee = await User.findByIdAndUpdate(
            traineeId,
            updateData,
            { new: true }
        ).select('-password');

        if (!trainee) {
            return res.status(404).json(
                successResponse('Trainee not found', null, 404)
            );
        }

        res.status(200).json(
            successResponse('Trainee updated successfully', trainee)
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

export const deleteTrainee = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const trainee = await User.findByIdAndDelete(req.params.id);
        if (!trainee) {
            return res.status(404).json(
                successResponse('Trainee not found', null, 404)
            );
        }
        res.status(200).json(
            successResponse('Trainee deleted successfully', null)
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};

