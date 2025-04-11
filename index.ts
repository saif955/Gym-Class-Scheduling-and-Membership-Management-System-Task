import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/database';
import userRoutes from './src/routes/userRoutes';
import trainerRoutes from './src/routes/trainerRoutes';
import scheduleRoutes from './src/routes/scheduleRoutes';
import traineeRoutes from './src/routes/traineeRoutes';
import  errorHandler  from './src/middleware/errorHandler';
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/trainer', trainerRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trainee',traineeRoutes);
app.use('/api/schedule',scheduleRoutes);
app.use(errorHandler);
// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  

export default app
