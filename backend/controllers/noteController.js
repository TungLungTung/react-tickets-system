const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Note = require('../models/noteModel');
const Ticket = require('../models/ticketModel');

// @desc    Get note for a ticket
// @route   GET /api/tickets/:ticketId/note
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using id and the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// @desc    Create ticket notes
// @route   POST /api/tickets/:ticketId/note
// @access  Private
const addNotes = asyncHandler(async (req, res) => {
  // Get user using id and the JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id
  });

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNotes
};