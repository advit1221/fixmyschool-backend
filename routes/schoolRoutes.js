// routes/schoolRoutes.js
const express = require('express');
const router = express.Router();

const {
  registerSchool,
  loginSchool,
  getFeedbacks,
  listSchools,
} = require('../controllers/schoolController');

const { protectSchool } = require('../middlewares/auth');

// Public routes
router.post('/register', registerSchool);
router.post('/login', loginSchool);
router.get('/list', listSchools); // List all registered schools

// Protected route (school must be logged in)
router.get('/feedbacks', protectSchool, getFeedbacks);

module.exports = router;
