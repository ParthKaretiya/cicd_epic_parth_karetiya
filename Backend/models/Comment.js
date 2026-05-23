// ─────────────────────────────────────────────────────────────────────────────
//  Comment Model – Workflow collaboration
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
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
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
    collection: 'comments',
  }
);

module.exports = mongoose.model('Comment', commentSchema);
