// ─────────────────────────────────────────────────────────────────────────────
//  Data Model (Professor's Legacy Q&A Dataset)
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  instruction: { type: String, required: true },
  output: { type: String, required: true },
  topic: { type: String, index: true },
  difficulty: { type: String, index: true }
}, { 
  collection: 'data',
  timestamps: true
});

DataSchema.index({ instruction: 'text', output: 'text', topic: 'text' }, { language_override: 'none' });

// Use the 'cicd' database on the same connection instance
const db = mongoose.connection.useDb('cicd');
module.exports = db.model('Data', DataSchema);
