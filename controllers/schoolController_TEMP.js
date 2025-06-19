// controllers/schoolController.js
const asyncHandler = require("express-async-handler");
const School = require("../models/School");
const Feedback = require("../models/Feedback");
const jwt = require("jsonwebtoken");

// Register school
const registerSchool = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const schoolExists = await School.findOne({ email });
  if (schoolExists) {
    res.status(400);
    throw new Error("School already registered");
  }

  const school = await School.create({ name, email, password });
  if (school) {
    res.status(201).json({
      _id: school._id,
      name: school.name,
      email: school.email,
      token: generateToken(school._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid school data");
  }
});

// Login school
const loginSchool = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const school = await School.findOne({ email });
  if (school && (await school.matchPassword(password))) {
    res.json({
      _id: school._id,
      name: school.name,
      email: school.email,
      token: generateToken(school._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// Get feedbacks
const getFeedbacks = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({ school: req.school._id });
  res.json(feedbacks);
});

// List all schools (public route)
const listSchools = asyncHandler(async (req, res) => {
  const schools = await School.find().select("name email");
  res.json(schools);
});

// Token generator
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerSchool,
  loginSchool,
  getFeedbacks,
  listSchools,
};
