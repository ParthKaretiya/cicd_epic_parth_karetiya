// ─────────────────────────────────────────────────────────────────────────────
//  MongoDB Connection Configuration
//  Pipeline: .env → mongoose.connect() → indexes created → ready
// ─────────────────────────────────────────────────────────────────────────────
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.NODE_ENV === 'production' ? process.env.MONGO_ATLAS_URI : process.env.MONGO_LOCAL_URI;
  const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    
    // Register schemas to compile models for syncIndexes
    require('../models/Workflow');
    require('../models/InfraGuide');
    
    // Synchronize all schema indexes with MongoDB instance
    await conn.connection.syncIndexes();
    console.log('🔄 MongoDB Text & Field Indexes Synchronized Successfully');
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
