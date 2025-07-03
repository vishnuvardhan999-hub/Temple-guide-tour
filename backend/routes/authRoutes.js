const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');

// User registration
router.post('/register', registerUser);

// User login
router.post('/login', loginUser);

// Request password reset
router.post('/forgot-password', forgotPassword);

// Reset password using token
router.post('/reset-password/:token', resetPassword);

module.exports = router;
