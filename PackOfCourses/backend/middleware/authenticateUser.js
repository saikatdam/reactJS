const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Attach the user data to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authenticateUser;
