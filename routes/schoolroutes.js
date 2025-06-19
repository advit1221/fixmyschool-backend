// routes/schoolRoutes.js
const express = require('express');
const router = express.Router();
const { registerSchool, loginSchool, getFeedbacks } = require('../controllers/schoolController');
const { protectSchool } = require('../middlewares/auth');

router.post('/register', registerSchool);
router.post('/login', loginSchool);
router.get('/feedbacks', protectSchool, getFeedbacks);

module.exports = router;
const { listSchools } = require('../controllers/schoolController');
router.get('/list', listSchools); // GET /api/schools/list

