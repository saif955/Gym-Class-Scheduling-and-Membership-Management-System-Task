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

export const generateToken = (user: IUser): string => {
    const payload: TokenPayload = {
        id: (user._id as mongoose.Types.ObjectId).toString(),
        email: user.email,
        role: user.role
    };

    const options: SignOptions = {
        expiresIn: parseInt(JWT_EXPIRES_IN)
    };

    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error('Invalid token');
    }
};  
