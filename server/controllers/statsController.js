const Item = require('../models/Item');
const User = require('../models/User');

exports.getStats = async (req, res) => {
  try {
    const itemsFound = await Item.countDocuments({ status: { $in: ['Found', 'Returned'] } });
    const itemsReturned = await Item.countDocuments({ status: 'Returned' });
    const totalUsers = await User.countDocuments();
    const totalItems = await Item.countDocuments();

    res.json([
      { label: 'Items Reported', value: totalItems },
      { label: 'Items Found', value: itemsFound },
      { label: 'Items Returned', value: itemsReturned },
      { label: 'Registered Students', value: totalUsers },
    ]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
