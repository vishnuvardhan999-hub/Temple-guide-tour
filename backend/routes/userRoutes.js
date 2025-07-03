const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUserById,
  updateUserRole,
  updateProfile,
  updateTheme,
} = require('../controllers/userController');
//const { updateTheme } = require('../controllers/userController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
//const { updateProfile } = require('../controllers/userController');
const upload = require('../middleware/upload');

router.get('/me', authMiddleware, getUserProfile);


router.put('/me', authMiddleware, updateUserProfile);
router.put('/update-profile', authMiddleware, upload.single('profileImage'), updateProfile);

router.get('/', authMiddleware, isAdmin, getAllUsers);

router.delete('/:id', authMiddleware, isAdmin, deleteUserById);


router.put('/:id/role', authMiddleware, isAdmin, updateUserRole);

router.put('/update-theme', authMiddleware, updateTheme);

module.exports = router;
