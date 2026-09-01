// Run with: node seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');
const Item = require('./models/Item');

const run = async () => {
  await connectDB();

  await User.deleteMany({});
  await Item.deleteMany({});

  const hashed = await bcrypt.hash('password', 10);
  const demoUser = await User.create({
    name: 'Demo Student',
    email: 'demo@campushub.edu',
    password: hashed,
  });

  const items = [
    { title: 'MacBook Air', category: 'Electronics', location: 'CSE Block, Room 204', status: 'Lost', description: 'Silver MacBook Air, has a small dent on the lid.', image: '💻' },
    { title: 'Blue Backpack', category: 'Bags', location: 'Library, 2nd Floor', status: 'Lost', description: 'Navy blue backpack with a laptop sleeve and water bottle pocket.', image: '🎒' },
    { title: 'Black Wallet', category: 'Personal', location: 'Cafeteria', status: 'Found', description: 'Black leather wallet with a few cards inside.', image: '👛' },
    { title: 'House Keys', category: 'Others', location: 'Sports Complex', status: 'Lost', description: 'Bunch of keys with a red keychain.', image: '🔑' },
    { title: 'Sony Headphones', category: 'Electronics', location: 'Auditorium', status: 'Returned', description: 'Black Sony wireless over-ear headphones.', image: '🎧' },
    { title: 'Water Bottle', category: 'Others', location: 'CSE Block, Lab 3', status: 'Lost', description: 'Steel water bottle, silver colour.', image: '🍶' },
  ];

  for (const it of items) {
    await Item.create({ ...it, user: demoUser._id });
  }

  console.log('Seed complete. Demo login: demo@campushub.edu / password');
  mongoose.connection.close();
};

run();
