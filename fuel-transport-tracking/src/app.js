
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const db = require('./db');

// Import routes
const usersRoutes = require('./routes/users');
const transportsRoutes = require('./routes/transports');
const depotsRoutes = require('./routes/depots');
const terminalsRoutes = require('./routes/terminals');
const checkpointsRoutes = require('./routes/checkpoints');
const documentsRoutes = require('./routes/documents');
const flowMeterRoutes = require('./routes/flowMeter');
const fuelQualityRoutes = require('./routes/fuelQuality');
const activityLogsRoutes = require('./routes/activityLogs');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/transports', transportsRoutes);
app.use('/api/depots', depotsRoutes);
app.use('/api/terminals', terminalsRoutes);
app.use('/api/checkpoints', checkpointsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/flowmeter', flowMeterRoutes);
app.use('/api/fuelquality', fuelQualityRoutes);
app.use('/api/activitylogs', activityLogsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV}`);
});

module.exports = app;
