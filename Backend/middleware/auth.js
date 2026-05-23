// ─────────────────────────────────────────────────────────────────────────────
//  JWT Authentication Middleware
//  Protects routes requiring a valid JWT token
// ─────────────────────────────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('./asyncHandler');

// ── Protect – require valid token ───────────────────────────────────────────
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized – no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    if (req.user.isBlocked) {
      res.status(403);
      throw new Error('Account has been blocked');
    }

    next();
  } catch (error) {
    res.status(401);
    throw new Error('Not authorized – invalid token');
  }
});

// ── Authorize – restrict to specific roles ──────────────────────────────────
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(`Role '${req.user.role}' is not authorized for this action`);
    }
    next();
  };
};

// ── Optional Auth – attach user if token present, but don't block ───────────
const optionalAuth = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
    } catch (e) {
      // token invalid – continue without user
    }
  }
  next();
});

module.exports = { protect, authorize, optionalAuth };
