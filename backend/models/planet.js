const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
  name: String,
  size: Number,
  distanceFromSun: Number,
  description: String
});

module.exports = mongoose.model('Planet', planetSchema);
