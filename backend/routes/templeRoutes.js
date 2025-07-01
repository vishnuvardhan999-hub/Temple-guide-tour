const express = require('express');
const router = express.Router();
const templeController = require('../controllers/templeController');

router.post('/', templeController.createTemple);
router.get('/', templeController.getAllTemples);
router.get('/:id', templeController.getTempleById);
router.put('/:id', templeController.updateTemple);
router.delete('/:id', templeController.deleteTemple);

module.exports = router;
