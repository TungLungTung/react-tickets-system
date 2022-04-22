const mongoose = require('mongoose');

/// Create schema
const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' /// Ref to User Collections
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Ticket' /// Ref to Ticket Collections
    },
    text: {
      type: String,
      required: [true, 'Please add some text']
    },
    isStaff: {
      type: Boolean,
      default: false
    },
    staffId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Note', noteSchema);
