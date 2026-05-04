import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './src/config/db.js';
import { notFound, errorHandler } from './src/middleware/error.middleware.js';

// Load environment config
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Basic route
app.get('/', (req, res) => {
  res.send('BE5 Events API is running...');
});

import plannerRoutes from './src/routes/planner.routes.js';
import packageRoutes from './src/routes/package.routes.js';

// We will mount our routes here:
app.use('/api/planner', plannerRoutes);
app.use('/api/packages', packageRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
