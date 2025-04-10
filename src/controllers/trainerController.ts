import { Request, Response } from 'express';
import Schedule, { ISchedule } from "../models/Schedule";
import { 
    successResponse, 
    validationErrorResponse, 
    unauthorizedResponse, 
    limitExceededResponse,
    scheduleLimitExceededResponse 
} from "../utils/responseHandler";

interface ClassScheduleRequestBody {
    trainerId: string;
    className: string;
    description: string;
    date: string;
    startTime: string;
    maxParticipants: number;
}



export const getAllClassSchedules = async (req: Request, res: Response) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(
            successResponse('Class schedules retrieved successfully', schedules)
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};

export const createClassSchedule = async (req: Request<{}, {}, ClassScheduleRequestBody>, res: Response) => {
    try {
        const { trainerId, className, description, date, startTime, maxParticipants } = req.body;

        // Validate required fields
        if (!trainerId || !className || !description || !date || !startTime) {
            return res.status(400).json(
                validationErrorResponse('schedule', 'All fields are required')
            );
        }

        // Validate date is in the future
        const scheduleDate = new Date(date);
        if (scheduleDate < new Date()) {
            return res.status(400).json(
                validationErrorResponse('date', 'Schedule date must be in the future')
            );
        }

        // Validate time format
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(startTime)) {
            return res.status(400).json(
                validationErrorResponse('time', 'Invalid time format. Use HH:mm')
            );
        }

         // Calculate end time using the actual schedule date
         const [hours, minutes] = startTime.split(':');
         const startDateTime = new Date(scheduleDate);
         startDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
         const endDateTime = new Date(startDateTime);
         endDateTime.setHours(endDateTime.getHours() + 2);

        // Format end time to HH:mm
        const endTime = endDateTime.toLocaleTimeString('en-GB', { 
            hour: '2-digit', 
            minute: '2-digit', 
            hour12: false 
        });

        // Check for overlapping schedules
        const existingSchedule = await Schedule.findOne({
            trainerId,
            date,
            $or: [
                {
                    $and: [
                        { startTime: { $lte: startTime } },
                        { endTime: { $gt: startTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lt: endTime } },
                        { endTime: { $gte: endTime } }
                    ]
                }
            ]
        });

        if (existingSchedule) {
            return res.status(400).json(
                validationErrorResponse('schedule', 'Trainer has an overlapping schedule')
            );
        }

        // Check daily schedule limit
        const dailySchedules = await Schedule.countDocuments({ 
            trainerId, 
            date 
        });
        
        if (dailySchedules >= 5) {
            return res.status(400).json(
                scheduleLimitExceededResponse()
            );
        }

        const classSchedule = await Schedule.create({
            trainerId,
            className,
            description,
            date,
            startTime,
            endTime,
            maxParticipants: maxParticipants || 10,
            currentParticipants: 0,
            status: 'scheduled'
        });

        res.status(201).json(
            successResponse('Class schedule created successfully', classSchedule, 201)
        );
    } catch (error) {
        res.status(500).json(
            successResponse('Server error', null, 500)
        );
    }
};
