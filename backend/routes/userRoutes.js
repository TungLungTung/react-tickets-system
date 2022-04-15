const express = require('express');
const router = express.Router();
const {loginUser, registerUser} = require('../controllers/userController')

/// Using controller to do logic in route
router.post('/', registerUser)
router.post('/login', loginUser)

module.exports = router