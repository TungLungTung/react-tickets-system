const asyncHandler = require('express-async-handler');

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