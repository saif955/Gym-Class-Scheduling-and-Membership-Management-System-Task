import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
connectDB();


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  

