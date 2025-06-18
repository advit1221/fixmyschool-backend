const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const { registerValidator, loginValidator } = require('../utils/validators');
const { validationResult } = require('express-validator');

const router = express.Router();

// Register a new user
router.post('/register', registerValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  registerUser(req, res, next);
});

// Login
router.post('/login', loginValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  loginUser(req, res, next);
});

// Get current user info
router.get('/me', protect, getMe);

module.exports = router;
