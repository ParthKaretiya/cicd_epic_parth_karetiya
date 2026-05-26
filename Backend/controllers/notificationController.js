// ─────────────────────────────────────────────────────────────────────────────
//  Notifications Controller
// ─────────────────────────────────────────────────────────────────────────────
const Notification = require('../models/Notification');
const asyncHandler = require('../middleware/asyncHandler');

// GET /api/v1/notifications
exports.getAll = asyncHandler(async (req, res) => {
  const filter = req.user ? { user: req.user._id } : {};
  const notifications = await Notification.find(filter).sort({ createdAt: -1 }).limit(50);
  res.json({ success: true, count: notifications.length, data: notifications });
});

// PATCH /api/v1/notifications/:id/read
exports.markRead = asyncHandler(async (req, res) => {
  const n = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!n) { res.status(404); throw new Error('Notification not found'); }
  res.json({ success: true, data: n });
});

// DELETE /api/v1/notifications/:id
exports.remove = asyncHandler(async (req, res) => {
  const n = await Notification.findByIdAndDelete(req.params.id);
  if (!n) { res.status(404); throw new Error('Notification not found'); }
  res.json({ success: true, message: 'Notification deleted' });
});
