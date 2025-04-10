import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import adminRoutes from './routes/adminRoutes';
import trainerRoutes from './routes/trainerRoutes';
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
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trainer',trainerRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  

