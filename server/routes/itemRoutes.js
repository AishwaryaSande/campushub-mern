const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
  getItems,
  getItem,
  createItem,
  getMyItems,
  updateItem,
  deleteItem,
} = require('../controllers/itemController');

router.get('/', getItems);
router.get('/mine/all', protect, getMyItems);
router.get('/:id', getItem);
router.post('/', protect, createItem);
router.put('/:id', protect, updateItem);
router.delete('/:id', protect, deleteItem);

module.exports = router;
