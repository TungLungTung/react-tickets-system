const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/// Import Model
const User = require('../models/userModel');

// @desc    Register a new User
// @route   /api/users
// @access  Public

const registerUser = asyncHandler(async (req,res) => {
  const {name,email,password} = req.body;
  // res.send('Register route');

  /// Validation
  if(!name || !email || !password) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  //// Find if use alreay exists
  const userExists = await User.findOne({email})
  if(userExists) {
    res.status(400)
    throw new Error('User alreay exists')
  }

  /// Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  /// Create users
  const user = await User.create({
    name,
    email,
    password: hashedPassword
  })

  if(user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(400);
    throw new error('Invalid user data');
  }

})

// @desc    Login
// @route   /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req,res) => {

  /// get Email Password from body that we sent
  const {email, password} = req.body;
  const user = await User.findOne({
    email
  })

  /// Check user and passwords match
  if(user && (await bcrypt.compare(password, user.password))) {
    // If found and password match
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }

  res.send('Login route');
})

//// Another Routes
// @desc    Get current User
// @route   /api/users/me
// @access  Private
const getMe = asyncHandler(async (req,res) => {
  const user = {
    id: req.user._id,
    email: req.user.email,
    name: req.user.name
  }
  res.status(200).json(
    user
  )
})


/// Generate token
const generateToken = id => {
  return jwt.sign({
    id
  }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
}


module.exports = {
  registerUser,
  loginUser,
  getMe
}