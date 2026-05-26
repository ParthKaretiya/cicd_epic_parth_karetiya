// ─────────────────────────────────────────────────────────────────────────────
//  Comments Controller
// ─────────────────────────────────────────────────────────────────────────────
const Comment = require('../models/Comment');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/v1/comments/:workflowId
exports.addComment = asyncHandler(async (req, res) => {
  const comment = await Comment.create({
    workflow: req.params.workflowId,
    author: req.user?._id || req.body.author,
    content: req.body.content,
  });
  res.status(201).json({ success: true, data: comment });
});

// GET /api/v1/comments/:workflowId
exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ workflow: req.params.workflowId }).populate('author', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, count: comments.length, data: comments });
});

// PATCH /api/v1/comments/:commentId
exports.updateComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.commentId, { content: req.body.content }, { new: true });
  if (!comment) { res.status(404); throw new Error('Comment not found'); }
  res.json({ success: true, data: comment });
});

// DELETE /api/v1/comments/:commentId
exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByIdAndDelete(req.params.commentId);
  if (!comment) { res.status(404); throw new Error('Comment not found'); }
  res.json({ success: true, message: 'Comment deleted' });
});
