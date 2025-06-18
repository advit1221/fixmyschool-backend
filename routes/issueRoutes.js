const express = require('express');
const {
  createIssue,
  getMyIssues,
  getAllIssues,
  updateIssueStatus,
  addComment
} = require('../controllers/issueController');
const { protect, authorize } = require('../middlewares/auth');
const { issueValidator } = require('../utils/validators');
const { validationResult } = require('express-validator');

const router = express.Router();

// Submit new issue
router.post('/', protect, issueValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  createIssue(req, res, next);
});

// Get current user's issues
router.get('/my', protect, getMyIssues);

// Admin - get all issues
router.get('/all', protect, authorize('admin'), getAllIssues);

// Admin - update status
router.put('/:id/status', protect, authorize('admin'), updateIssueStatus);

// Add comment to an issue
router.post('/:id/comment', protect, addComment);

module.exports = router;
