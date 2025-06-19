const express = require('express');
const router = express.Router();
const { submitFeedback, getPublicFeedbacks } = require('../controllers/feedbackController');

router.post('/', submitFeedback); // /api/feedbacks
router.get('/public', getPublicFeedbacks); // /api/feedbacks/public

module.exports = router;
