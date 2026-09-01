const Item = require('../models/Item');

// GET /api/items?search=&category=&status=
exports.getItems = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    const filter = {};

    if (category && category !== 'All') filter.category = category;
    if (status && status !== 'All') filter.status = status;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const items = await Item.find(filter).populate('user', 'name email').sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/items/:id
exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('user', 'name email');
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/items (protected)
exports.createItem = async (req, res) => {
  try {
    const { title, category, location, status, description, image, contact } = req.body;

    if (!title || !location) {
      return res.status(400).json({ message: 'Title and location are required' });
    }

    const item = await Item.create({
      title,
      category,
      location,
      status,
      description,
      image,
      contact,
      user: req.user.id,
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/items/mine/all (protected)
exports.getMyItems = async (req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/items/:id (protected, owner only)
exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to edit this item' });
    }

    Object.assign(item, req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/items/:id (protected, owner only)
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this item' });
    }

    await item.deleteOne();
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
