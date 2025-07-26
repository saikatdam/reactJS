// const authenticateAdmin = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
  
//     if (!token) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       if (!decoded.isAdmin) {
//         return res.status(403).json({ message: 'You are not authorized' });
//       }
//       req.user = decoded;
//       next();
//     } catch (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//   };


const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateAdmin = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from headers

  if (!token) return res.status(403).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    
    const userDetails = await User.findById(decoded.id);
    // console.log(userDetails.role)

    // Replace 'secretKey' with your actual secret
    req.user = userDetails; // Attach decoded token to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticateAdmin;


