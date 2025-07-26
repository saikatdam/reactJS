const jwt = require('jsonwebtoken');
const User = require('../models/User');  // Adjust the path as needed

// Middleware to check if the user is authenticated
const authMiddleware = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Extract token
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Make sure you have the correct JWT secret

    // Attach the decoded user information to the request object
    req.user = await User.findById(decoded.id);  // Assuming `id` is in the payload of the JWT

    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
