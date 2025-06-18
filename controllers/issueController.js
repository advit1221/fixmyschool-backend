const Issue = require('../models/Issue');

// @desc    Create a new issue
exports.createIssue = async (req, res) => {
  try {
    const { title, description, category, priority, location } = req.body;

    const issue = await Issue.create({
      user: req.user.id,
      title,
      description,
      category,
      priority,
      location
    });

    res.status(201).json({ success: true, issue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get issues submitted by current user
exports.getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, issues });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all issues (admin)
exports.getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, issues });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update issue status (admin)
exports.updateIssueStatus = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    issue.status = req.body.status || issue.status;
    await issue.save();

    res.json({ success: true, issue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Add comment to an issue
exports.addComment = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) return res.status(404).json({ message: 'Issue not found' });

    issue.comments.push({
      user: req.user.id,
      message: req.body.message
    });

    await issue.save();
    res.json({ success: true, issue });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
