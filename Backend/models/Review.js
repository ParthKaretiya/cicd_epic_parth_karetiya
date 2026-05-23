// ─────────────────────────────────────────────────────────────────────────────
//  Review Model – Workflow peer reviews
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    workflow: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workflow',
      required: true,
      index: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      trim: true,
      maxlength: 5000,
      default: '',
    },
    status: {
      type: String,
      enum: ['approved', 'changes-requested', 'pending'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    collection: 'reviews',
  }
);

module.exports = mongoose.model('Review', reviewSchema);
