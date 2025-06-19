// models/Feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  content: { type: String, required: true },
  rating: { type: Number, default: 5 },
  schoolName: { type: String, required: true },
  anonymous: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
