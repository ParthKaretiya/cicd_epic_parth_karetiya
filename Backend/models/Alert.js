// ─────────────────────────────────────────────────────────────────────────────
//  Alert Model – Monitoring alerts
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['cpu', 'memory', 'disk', 'network', 'custom', 'uptime'],
      default: 'custom',
    },
    condition: { type: String, required: true },
    threshold: { type: Number, default: 80 },
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical'],
      default: 'medium',
    },
    isActive: { type: Boolean, default: true },
    lastTriggered: { type: Date },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    collection: 'alerts',
  }
);

module.exports = mongoose.model('Alert', alertSchema);
