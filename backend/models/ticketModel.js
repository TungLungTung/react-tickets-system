const mongoose = require('mongoose');

/// Create schema
const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User' /// Ref to User Collections
    },
    product: {
      type: String,
      required: [true, 'Please select product'],
      enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad']
    },
    description: {
      type: String,
      required: [true, 'Please enter a description']
    },
    status: {
      type: String,
      required: true,
      enum: ['new', 'open', 'closed'],
      default: 'new'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
