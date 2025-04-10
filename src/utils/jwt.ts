import jwt, { SignOptions } from 'jsonwebtoken';
import { IUser } from '../models/Users';
import mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

interface TokenPayload {
    id: string;
    email: string;
    role: string;
}

export const generateToken = (user: IUser) => {
    return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1d' });
}

export const verifyToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error('Invalid token');
    }
};  
