// traineeController.ts - Fixed Version
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import User from "../models/Users";
import Schedule from "../models/Schedule";
import {
    successResponse,
    validationErrorResponse,
    unauthorizedResponse
} from "../utils/responseHandler";
import { hashPassword } from '../utils/password';

interface AuthRequest extends Request {
    user?: { id: string; role: string }; // Matches middleware definition
}

export const enrollSchedule = async (req: AuthRequest, res: Response) => {
    try {
        const { scheduleId } = req.body;
        const userId = req.user?.id;

        // Validate inputs
        if (!scheduleId) {
            return res.status(400).json(
                validationErrorResponse('scheduleId', 'Schedule ID is required')
            );
        }

        if (!userId || !Types.ObjectId.isValid(userId)) {
            return res.status(401).json(
                unauthorizedResponse('Invalid user authentication')
            );
        }

        // Convert to ObjectId after validation
        const userIdObj = new Types.ObjectId(userId);
        const scheduleIdObj = new Types.ObjectId(scheduleId);

        // Atomic enrollment operation
        const updatedSchedule = await Schedule.findOneAndUpdate(
            {
                _id: scheduleIdObj,
                status: 'scheduled',
                $expr: { $lt: ["$currentParticipants", "$maxParticipants"] },
                participants: { $ne: userIdObj }
            },
            {
                $addToSet: { participants: userIdObj },
                $inc: { currentParticipants: 1 }
            },
            { new: true }
        );

        if (!updatedSchedule) {
            return res.status(400).json(
                validationErrorResponse('schedule', 'Schedule is not available for enrollment')
            );
        }

        // Update user's enrolled schedules
        const updatedUser = await User.findByIdAndUpdate(
            userIdObj,
            { $addToSet: { enrolledSchedules: scheduleIdObj } },
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            // Rollback schedule update if user not found
            await Schedule.findByIdAndUpdate(scheduleIdObj, {
                $pull: { participants: userIdObj },
                $inc: { currentParticipants: -1 }
            });
            return res.status(404).json(
                successResponse('User not found', null, 404)
            );
        }

        res.status(200).json(
            successResponse('Successfully enrolled in the schedule', {
                scheduleId: updatedSchedule._id,
                className: updatedSchedule.className,
                date: updatedSchedule.date.toISOString().split('T')[0],
                startTime: updatedSchedule.startTime,
                endTime: updatedSchedule.endTime
            })
        );
    } catch (error) {
        console.error('Enrollment error:', error);
        res.status(500).json({
            success: false,
            message: error instanceof Error ? error.message : 'Server error',
            statusCode: 500,
            data: null
        });
    }
};

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        
        if (!userId || !Types.ObjectId.isValid(userId)) {
            return res.status(401).json(
                unauthorizedResponse('Invalid authentication')
            );
        }

        const user = await User.findById(new Types.ObjectId(userId))
            .select('-password')
            .populate('enrolledSchedules', 'className date startTime endTime');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                statusCode: 404,
                data: null
            });
        }

        res.status(200).json(
            successResponse('Profile retrieved successfully', {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                enrolledSchedules: user.enrolledSchedules
            })
        );
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error',
            statusCode: 500,
            data: null
        });
    }
};