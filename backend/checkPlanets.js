// checkPlanets.js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/CosmoExplorer', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('❌ Connection error:', err));

const Planet = mongoose.model('Planet', new mongoose.Schema({
  name: String,
  size: Number,
  distanceFromSun: Number,
  description: String,
  image: String
}), 'planets');

(async () => {
  try {
    const planets = await Planet.find();
    console.log(`\n🌍 Found ${planets.length} planets:`);
    planets.forEach((p, i) => {
      console.log(`${i + 1}. ${p.name} | _id: ${p._id}`);
    });
  } catch (err) {
    console.error('❌ Error fetching planets:', err);
  } finally {
    mongoose.connection.close();
  }
})();
