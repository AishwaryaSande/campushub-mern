const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      enum: ['Electronics', 'Bags', 'Personal', 'Documents', 'Others'],
      default: 'Others',
    },
    location: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Lost', 'Found', 'Returned'],
      default: 'Lost',
    },
    description: { type: String, default: '' },
    image: { type: String, default: '' }, // emoji or image URL
    contact: { type: String, default: '' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

ItemSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Item', ItemSchema);
