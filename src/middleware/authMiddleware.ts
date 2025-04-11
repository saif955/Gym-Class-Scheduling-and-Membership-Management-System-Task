import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { unauthorizedResponse } from '../utils/responseHandler';
import { AuthRequest } from '../types/userTypes';
// Define the user type that will be attached to the request

// Authentication middleware
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json(
              unauthorizedResponse('No token provided')
            );
        }

        // Extract token from "Bearer <token>"
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json(
              unauthorizedResponse('Invalid token format')
            );
        }

        // Verify token
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json(
          unauthorizedResponse('Invalid token')
        );
    }
};

// Role-based authorization middleware
export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json(
          unauthorizedResponse('Authentication required')
        );
    }
    if (req.user.role !== 'admin') {
        return res.status(403).json(
          unauthorizedResponse('Admin access required')
        );
    }
    next();
};

export const authorizeTrainer = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json(
          unauthorizedResponse('Authentication required')
        );
    }
    if (req.user.role !== 'trainer') {
        return res.status(403).json(
          unauthorizedResponse('Trainer access required')
        );
    }
    next();
};

export const authorizeTrainee = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json(
          unauthorizedResponse('Authentication required')
        );
    }
    if (req.user.role !== 'trainee') {
        return res.status(403).json(
          unauthorizedResponse('Trainee access required')
        );
    }
    next();
};
