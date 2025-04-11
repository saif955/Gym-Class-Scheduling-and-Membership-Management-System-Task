import { NextFunction, Request, Response } from 'express';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);

  if (error.name === 'ValidationError') {
    // Validation error
    res.status(400).json({
      success: false,
      message: 'Validation error occurred.',
      errorDetails: {
        field: error.path,
        message: error.message,
      },
    });
  } else if (error.name === 'UnauthorizedError') {
    // Unauthorized access
    res.status(401).json({
      success: false,
      message: 'Unauthorized access.',
      errorDetails: 'You must be an admin to perform this action.',
    });
  } else if (error.message.includes('Class schedule is full')) {
    // Booking limit exceeded
    res.status(400).json({
      success: false,
      message: 'Class schedule is full. Maximum 10 trainees allowed per schedule.',
    });
  } else {
    // Generic error
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export default errorHandler;