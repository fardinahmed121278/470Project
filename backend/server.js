// backend/server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/CosmoExplorer')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Planet Schema
const planetSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
}, { collection: 'planets' });

const Planet = mongoose.model('Planet', planetSchema);

// API route — Planets
app.get('/api/planets', async (req, res) => {
  try {
    const planets = await Planet.find({}, { __v: 0 }).lean();
    console.log("📡 Sending planets:", planets);
    res.json(planets || []);
  } catch (err) {
    console.error('❌ Error fetching planets:', err);
    res.status(500).json({ error: 'Failed to fetch planets' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
