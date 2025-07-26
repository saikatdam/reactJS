const express = require('express')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Router = express.Router();

Router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered' });
  });

  Router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid password' });
  
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ token });
  });
  


module.exports = Router;
  