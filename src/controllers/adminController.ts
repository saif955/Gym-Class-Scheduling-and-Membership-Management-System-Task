import { Request, Response } from 'express';
import User, { IUser } from "../models/Users";
import { hashPassword } from "../utils/password";
import {
    successResponse,
    validationErrorResponse,
    unauthorizedResponse
} from "../utils/responseHandler";

interface TrainerRequestBody {
    name: string;
    email: string;
    password: string;
}

export const createTrainer = async (req: Request<{}, {}, TrainerRequestBody>, res: Response) => {
    try {
        const { name, email, password } = req.body;

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json(
                validationErrorResponse('trainer', 'All fields are required')
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

        const trainer = new User({
            name,
            email,
            password: hashedPassword,
            role: 'trainer'
        });
        await trainer.save();

        res.status(201).json(
            successResponse('Trainer created successfully', {
                trainer: {
                    id: trainer._id,
                    name: trainer.name,
                    email: trainer.email,
                    role: trainer.role
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

export const updateTrainer = async (req: Request<{ id: string }, {}, TrainerRequestBody>, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const trainerId = req.params.id;

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

        const trainer = await User.findByIdAndUpdate(
            trainerId,
            updateData,
            { new: true }
        ).select('-password');

        if (!trainer) {
            return res.status(404).json(
                successResponse('Trainer not found', null, 404)
            );
        }

        res.status(200).json(
            successResponse('Trainer updated successfully', trainer)
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

export const deleteTrainer = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const trainer = await User.findByIdAndDelete(req.params.id);
        if (!trainer) {
            return res.status(404).json(
                successResponse('Trainer not found', null, 404)
            );
        }
        res.status(200).json(
            successResponse('Trainer deleted successfully', null)
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};

export const getAllTrainers = async (req: Request, res: Response) => {
    try {
        const trainers = await User.find({ role: 'trainer' }).select('-password');
        res.status(200).json(
            successResponse('Trainers retrieved successfully', trainers)
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};

export const getTrainerById = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const trainer = await User.findOne({ 
            _id: req.params.id, 
            role: 'trainer' 
        }).select('-password');
        
        if (!trainer) {
            return res.status(404).json(
                successResponse('Trainer not found', null, 404)
            );
        }
        res.status(200).json(
            successResponse('Trainer retrieved successfully', trainer)
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};