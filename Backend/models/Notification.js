// ─────────────────────────────────────────────────────────────────────────────
//  Notification Model
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'error', 'workflow', 'comment', 'review'],
      default: 'info',
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: { type: Boolean, default: false },
    link: { type: String, default: '' },
  },
  {
    timestamps: true,
    collection: 'notifications',
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
