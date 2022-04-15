const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getMe} = require('../controllers/userController')

const {protect} = require('../middleware/authMiddleware');

/// Using controller to do logic in route
router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe) // Pass 2 agurment protect middleware

module.exports = router