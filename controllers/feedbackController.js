const Feedback = require('../models/Feedback');
const School = require('../models/School');

// 📌 Create feedback
exports.submitFeedback = async (req, res) => {
  const { content, rating, schoolName, anonymous } = req.body;
  const feedback = await Feedback.create({ content, rating, schoolName, anonymous });
  res.status(201).json(feedback);
};

// 📌 Get all public feedbacks
exports.getPublicFeedbacks = async (req, res) => {
  const feedbacks = await Feedback.find({}, '-schoolName'); // hide schoolName
  res.json(feedbacks);
};
