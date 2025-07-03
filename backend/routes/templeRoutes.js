const express = require('express');
const router = express.Router();
const templeController = require('../controllers/templeController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');

// Authenticated users (user or admin) can view temples
router.get('/', authMiddleware, templeController.getAllTemples);
router.get('/:id', authMiddleware, templeController.getTempleById);

// New: Get temples near user's location
// Usage example: GET /api/temples/nearby?lat=12.97&lng=77.59&radius=10 (radius in km)
router.get('/nearby', authMiddleware, templeController.getNearbyTemples);

// Admin-only routes for modifying temples
router.post('/', authMiddleware, isAdmin, templeController.createTemple);
router.put('/:id', authMiddleware, isAdmin, templeController.updateTemple);
router.delete('/:id', authMiddleware, isAdmin, templeController.deleteTemple);

module.exports = router;
