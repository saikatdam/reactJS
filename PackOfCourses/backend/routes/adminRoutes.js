// const express = require('express');
// const jwt = require('jsonwebtoken');
// const Course = require('../models/Course');

// const router = express.Router();

// const isAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded.isAdmin) return res.status(403).json({ message: "Forbidden" });
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// router.get('/courses', isAdmin, async (req, res) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const QRCode = require('qrcode');
const authenticateToken = require('../middleware/authenticateToken');
const Course = require('../models/Course');
const AdminCourse = require('../models/AdminCourse'); // Import AdminCourse model

// router.get('/courses/:courseId', authenticateToken, async (req, res) => {
//   const { courseId } = req.params;

//   try {
//     const course = await Course.findById(courseId);
//     if (!course) {
//       return res.status(404).json({ message: 'Course not found' });
//     }

//     // Generate QR code containing the course ID
//     const qrCodeData = `CourseID:${courseId}`;
//     const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

//     res.json({
//       qrCodeUrl,
//       courseDetails: {
//         title: course.title,
//         description: course.description,
//         price: course.price,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching course data' });
//   }
// });



const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: 'Access denied: Admins only' });
  }
  next();
};

// Fetch all purchased courses (Admin only)
router.get('/admin/courses', authenticateToken, isAdmin, async (req, res) => {
  try {
    const purchasedCourses = await AdminCourse.find();
    res.json(purchasedCourses);
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ message: 'Failed to fetch purchased courses' });
  }
});



// router.post('/submit-payment', authenticateToken, async (req, res) => {
//   const { courseId } = req.body;
//   const userId = req.user.id;

//   try {
//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: 'Course not found' });

//     const existingPurchase = await AdminCourse.findOne({ userId, courseId });
//     if (existingPurchase) {
//       return res.status(400).json({ message: 'You have already purchased this course' });
//     }

//     await AdminCourse.create({
//       userId,
//       courseId,
//       courseTitle: course.title,
//       courseDescription: course.description,
//       purchaseDate: new Date(),
//     });

//     res.json({ message: 'Payment successful. Course purchased!' });
//   } catch (error) {
//     console.error('Error processing payment:', error);
//     res.status(500).json({ message: 'Error processing payment' });
//   }
// });


router.post('/submit-payment', authenticateToken, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id; // Extract user ID from the token

  try {
    // Find the course and update it
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if the user has already purchased the course
    if (course.purchasedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already purchased this course' });
    }

    // Add user ID to the purchasedBy array
    course.purchasedBy.push(userId);
    await course.save();

    // Store purchased course details in adminCourse DB
    await AdminCourse.create({
      userId,
      courseId,
      courseTitle: course.title,
      courseDescription: course.description,
      purchaseDate: new Date(),
    });

    res.json({ message: 'Payment successful. Course purchased!' });
  } catch (error) {
    res.status(500).json({ message: 'Error processing payment' });
  }
});


module.exports = router;
