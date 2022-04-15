const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

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
      email: user.email
    })
  } else {
    res.status(400);
    throw new error('Invalid user data')
  }

})

// @desc    Login
// @route   /api/users/login
// @access  Public

const loginUser = asyncHandler(async (req,res) => {
  res.send('Login route');
})

//// Another Routes

module.exports = {
  registerUser,
  loginUser
}