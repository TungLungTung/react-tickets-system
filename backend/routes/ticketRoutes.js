const express = require('express');
const router = express.Router();

const {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket
} = require('../controllers/ticketController');

const { protect } = require('../middleware/authMiddleware');
const { route } = require('./noteRoutes');

/// add mergeParams: true in NOteRoutes
/// Re-route into note router api/tickets/:ticketId/note
const noteRouter = require('./noteRoutes');
router.use('/:ticketId/notes', noteRouter);

router.route('/').get(protect, getTickets).post(protect, createTicket);
router
  .route('/:id')
  .get(protect, getTicket)
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
