import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try{
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
    if(req.user.role !== 'admin'){
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

export const authorizeTrainer = (req: Request, res: Response, next: NextFunction) => {
    if(req.user.role !== 'trainer'){
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};

export const authorizeTrainee = (req: Request, res: Response, next: NextFunction) => {
    if(req.user.role !== 'trainee'){
        return res.status(403).json({ message: 'Forbidden' });
    }
    next();
};


