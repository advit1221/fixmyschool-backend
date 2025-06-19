// controllers/schoolController.js
const School = require('../models/School');
const jwt = require('jsonwebtoken');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

exports.registerSchool = async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await School.findOne({ email });
  if (existing) return res.status(400).json({ message: 'School already exists' });

  const school = await School.create({ name, email, password });
  const token = generateToken(school._id);
  res.status(201).json({ token, school: { name: school.name, email: school.email } });
};

exports.loginSchool = async (req, res) => {
  const { email, password } = req.body;
  const school = await School.findOne({ email });
  if (!school || !(await school.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = generateToken(school._id);
  res.json({ token, school: { name: school.name, email: school.email } });
};

exports.getFeedbacks = async (req, res) => {
  const school = await School.findById(req.user.id);
  const feedbacks = await require('../models/Feedback').find({ schoolName: school.name });
  res.json(feedbacks);
};
exports.listSchools = async (req, res) => {
  const schools = await School.find({}, 'name');
  res.json(schools);
};
