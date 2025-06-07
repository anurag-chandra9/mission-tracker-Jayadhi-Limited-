const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ msg: 'Invalid email' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ msg: 'Invalid password' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  res.json({ token });
});

// Register new admin
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ msg: 'Email already exists' });
    const admin = new Admin({ email, password });
    await admin.save();
    res.json({ msg: 'Admin created' });
  } catch (err) {
    res.status(500).json({ msg: 'Registration failed' });
  }
});

module.exports = router;