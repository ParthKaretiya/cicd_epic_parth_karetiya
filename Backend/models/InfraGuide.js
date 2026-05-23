// ─────────────────────────────────────────────────────────────────────────────
//  InfraGuide Model – Kubernetes & Infrastructure Guides
//  Collection: "infra_guides"
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const infraGuideSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        'k8s', 'docker', 'helm', 'terraform', 'aws', 'gcp', 'azure',
        'pods', 'services', 'deployments', 'ingress', 'configmaps',
        'secrets', 'volumes', 'networking', 'autoscaling', 'security',
        'monitoring', 'logging', 'templates'
      ],
      index: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    tags: {
      type: [String],
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
    collection: 'infra_guides',
  }
);

infraGuideSchema.index({ title: 'text', description: 'text', content: 'text' });

module.exports = mongoose.model('InfraGuide', infraGuideSchema);
