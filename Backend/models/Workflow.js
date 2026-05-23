// ─────────────────────────────────────────────────────────────────────────────
//  Workflow Model – CI/CD Pipeline Workflows
//  Tracks workflow definitions, runs, metrics, versions, logs
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

// ── Step Schema (pipeline steps) ─────────────────────────────────────────────
const stepSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    command: { type: String, required: true },
    order: { type: Number, default: 0 },
    timeout: { type: Number, default: 300 },
    continueOnError: { type: Boolean, default: false },
  },
  { _id: false }
);

// ── Run Schema (execution history) ──────────────────────────────────────────
const runSchema = new mongoose.Schema(
  {
    runId: { type: String, required: true },
    status: {
      type: String,
      enum: ['queued', 'running', 'success', 'failed', 'cancelled'],
      default: 'queued',
    },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
    duration: { type: Number },
    triggeredBy: { type: String, default: 'manual' },
    logs: [String],
  },
  { _id: false }
);

// ── Version Schema ──────────────────────────────────────────────────────────
const versionSchema = new mongoose.Schema(
  {
    versionNumber: { type: Number, required: true },
    content: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now },
    message: { type: String },
  },
  { _id: false }
);

// ── Log Entry Schema ────────────────────────────────────────────────────────
const logEntrySchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: Date.now },
    level: {
      type: String,
      enum: ['info', 'warn', 'error', 'debug'],
      default: 'info',
    },
    message: { type: String, required: true },
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false }
);

// ── Main Workflow Schema ────────────────────────────────────────────────────
const workflowSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Workflow name is required'],
      trim: true,
      maxlength: 200,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      enum: [
        'ci', 'cd', 'ci/cd', 'deployment', 'testing', 'security',
        'monitoring', 'infrastructure', 'automation', 'other',
      ],
      default: 'ci/cd',
    },
    platform: {
      type: String,
      enum: [
        'github-actions', 'gitlab-ci', 'jenkins', 'circleci',
        'azure-devops', 'bitbucket', 'travis-ci', 'other',
      ],
      default: 'github-actions',
    },
    language: {
      type: String,
      default: 'yaml',
    },
    content: {
      type: String,
      default: '',
    },
    steps: [stepSchema],
    tags: {
      type: [String],
      default: [],
      index: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    topic: {
      type: String,
      trim: true,
      lowercase: true,
      default: 'general',
      index: true,
    },
    // ── Metrics ───────────────────────────────────────────────
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    bookmarks: { type: Number, default: 0 },
    clones: { type: Number, default: 0 },
    runCount: { type: Number, default: 0 },
    successRate: { type: Number, default: 0, min: 0, max: 100 },
    avgBuildTime: { type: Number, default: 0 },
    // ── State ─────────────────────────────────────────────────
    status: {
      type: String,
      enum: ['active', 'archived', 'draft', 'running', 'cancelled'],
      default: 'active',
    },
    isPublic: { type: Boolean, default: true },
    // ── History ───────────────────────────────────────────────
    runs: [runSchema],
    versions: [versionSchema],
    logs: [logEntrySchema],
    // ── Author ────────────────────────────────────────────────
    author: {
      name: { type: String, default: 'system' },
      email: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
    collection: 'workflows',
  }
);

// ── Indexes ─────────────────────────────────────────────────────────────────
workflowSchema.index(
  { name: 'text', description: 'text', content: 'text' },
  { language_override: 'none' }
);
workflowSchema.index({ views: -1 });
workflowSchema.index({ likes: -1 });
workflowSchema.index({ createdAt: -1 });
workflowSchema.index({ status: 1, isPublic: 1 });

module.exports = mongoose.model('Workflow', workflowSchema);
