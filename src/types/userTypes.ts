import { Request, Response } from 'express';
import { Document, Types } from 'mongoose';
export interface TraineeRequestBody {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}



export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

export interface TrainerRequestBody {
    name: string;
    email: string;
    password: string;
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'trainer' | 'trainee';
    enrolledSchedules?: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

export interface TokenPayload {
    id: string;
    email: string;
    role: string;
}