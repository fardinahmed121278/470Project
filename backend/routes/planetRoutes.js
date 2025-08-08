const express = require('express');
const router = express.Router();
const Planet = require('../models/Planet');

// Get all planets
router.get('/', async (req, res) => {
  const planets = await Planet.find();
  res.json(planets);
});

// Get single planet by ID
router.get('/:id', async (req, res) => {
  const planet = await Planet.findById(req.params.id);
  res.json(planet);
});

// Compare two planets by ID (query: ?id1=...&id2=...)
router.get('/compare', async (req, res) => {
  const { id1, id2 } = req.query;
  const planet1 = await Planet.findById(id1);
  const planet2 = await Planet.findById(id2);
  res.json({ planet1, planet2 });
});

module.exports = router;
