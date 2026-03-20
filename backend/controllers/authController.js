const crypto = require('crypto');
const { users } = require('../data/db');

const register = (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required' });
  }

  // Check if email already exists
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const newUser = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully', user: newUser });
};

module.exports = { register };
