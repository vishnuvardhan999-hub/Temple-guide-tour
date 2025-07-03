const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmarkController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Add a bookmark
router.post('/', authMiddleware, bookmarkController.addBookmark);

// Get all bookmarks for current user
router.get('/', authMiddleware, bookmarkController.getBookmarks);

// Remove a bookmark by temple ID
router.delete('/:templeId', authMiddleware, bookmarkController.removeBookmark);

module.exports = router;
