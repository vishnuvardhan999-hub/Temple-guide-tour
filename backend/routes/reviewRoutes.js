const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Add a review
router.post('/', authMiddleware, reviewController.addReview);

// Get all reviews for a temple
router.get('/:templeId', reviewController.getTempleReviews);

// Delete a review by review ID
router.delete('/:reviewId', authMiddleware, reviewController.deleteReview);

module.exports = router;
