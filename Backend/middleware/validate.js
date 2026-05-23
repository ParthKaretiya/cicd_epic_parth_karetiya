// ─────────────────────────────────────────────────────────────────────────────
//  Validation Middleware – Express Validator helpers
// ─────────────────────────────────────────────────────────────────────────────
const { body, validationResult } = require('express-validator');

// Run validations and return errors if any
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// ── Common Validation Rules ─────────────────────────────────────────────────
const dataCreateRules = [
  body('instruction')
    .trim()
    .notEmpty()
    .withMessage('instruction is required')
    .isLength({ min: 10 })
    .withMessage('instruction must be at least 10 characters'),
  body('output')
    .trim()
    .notEmpty()
    .withMessage('output is required')
    .isLength({ min: 10 })
    .withMessage('output must be at least 10 characters'),
  body('topic').optional().trim(),
  body('difficulty')
    .optional()
    .isIn(['Beginner', 'Intermediate', 'Advanced'])
    .withMessage('difficulty must be Beginner, Intermediate, or Advanced'),
];

const workflowCreateRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Workflow name is required')
    .isLength({ max: 200 })
    .withMessage('Name must be under 200 characters'),
  body('description').optional().trim(),
  body('category').optional().isIn([
    'ci', 'cd', 'ci/cd', 'deployment', 'testing', 'security',
    'monitoring', 'infrastructure', 'automation', 'other',
  ]),
  body('platform').optional().isIn([
    'github-actions', 'gitlab-ci', 'jenkins', 'circleci',
    'azure-devops', 'bitbucket', 'travis-ci', 'other',
  ]),
];

const registerRules = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];

const loginRules = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

module.exports = {
  validate,
  dataCreateRules,
  workflowCreateRules,
  registerRules,
  loginRules,
};
