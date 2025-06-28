
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import all route files
import usersRoutes from './routes/users.js';
import transportsRoutes from './routes/transports.js';
import depotsRoutes from './routes/depots.js';
import terminalsRoutes from './routes/terminals.js';
import checkpointsRoutes from './routes/checkpoints.js';
import documentsRoutes from './routes/documents.js';
import activityLogsRoutes from './routes/activityLogs.js';
import flowMeterRoutes from './routes/flowMeter.js';
import fuelQualityRoutes from './routes/fuelQuality.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Fuel Transport Tracking API is running!' });
});

// API Routes
app.use('/api/users', usersRoutes);
app.use('/api/transports', transportsRoutes);
app.use('/api/depots', depotsRoutes);
app.use('/api/terminals', terminalsRoutes);
app.use('/api/checkpoints', checkpointsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/activity-logs', activityLogsRoutes);
app.use('/api/flow-meter', flowMeterRoutes);
app.use('/api/fuel-quality', fuelQualityRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
