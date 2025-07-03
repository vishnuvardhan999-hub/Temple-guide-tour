const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const { templeId, rating, comment } = req.body;

    
    const existing = await Review.findOne({ user: req.user._id, temple: templeId });
    if (existing) {
      return res.status(400).json({ error: 'You have already reviewed this temple' });
    }

    const review = await Review.create({
      user: req.user._id,
      temple: templeId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// Get reviews for a temple
exports.getTempleReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ temple: req.params.templeId })
      .populate('user', 'username');

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to get reviews' });
  }
};


exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

   
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await review.deleteOne();

    res.json({ message: 'Review deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
