const { check } = require('express-validator');

// Validation for user registration
exports.registerValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];

// Validation for login
exports.loginValidator = [
  check('email', 'Valid email is required').isEmail(),
  check('password', 'Password is required').exists()
];

// Validation for issue creation
exports.issueValidator = [
  check('title', 'Title is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('category', 'Category is required').not().isEmpty(),
  check('priority', 'Priority must be low, medium, or high').isIn(['low', 'medium', 'high'])
];
