const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const issueSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    location: { type: String },
    status: {
      type: String,
      enum: ['open', 'in progress', 'resolved'],
      default: 'open'
    },
    comments: [commentSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Issue', issueSchema);
