const express = require('express');
//// Can use params in ticket route
const router = express.Router({
  mergeParams: true
});
const { getNotes, addNotes } = require('../controllers/noteController');

/// Middleware
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getNotes).post(protect, addNotes);

module.exports = router;
