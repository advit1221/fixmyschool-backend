const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const issueRoutes = require('./routes/issueRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/issues', issueRoutes);

// Test route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'FixMySchool Backend is running ✅',
  });
});

// Error Handler
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
const schoolRoutes = require('./routes/schoolRoutes');
app.use('/api/schools', schoolRoutes);

