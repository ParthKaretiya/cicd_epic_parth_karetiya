// ─────────────────────────────────────────────────────────────────────────────
//  Reviews Controller
// ─────────────────────────────────────────────────────────────────────────────
const Review = require('../models/Review');
const asyncHandler = require('../middleware/asyncHandler');

// POST /api/v1/reviews/:workflowId
exports.submitReview = asyncHandler(async (req, res) => {
  const review = await Review.create({
    workflow: req.params.workflowId,
    author: req.user?._id || req.body.author,
    rating: req.body.rating,
    comment: req.body.comment,
    status: req.body.status || 'pending',
  });
  res.status(201).json({ success: true, data: review });
});

// GET /api/v1/reviews/:workflowId
exports.getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ workflow: req.params.workflowId }).populate('author', 'name email').sort({ createdAt: -1 });
  res.json({ success: true, count: reviews.length, data: reviews });
});
