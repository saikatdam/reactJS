const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const adminRoutes = require('./routes/adminRoutes')
const QRCode = require('qrcode');
const AdminCourse = require('./models/AdminCourse')
const authenticateAdmin = require('./middleware/authenticateAdmin')
const Video = require('./models/Video');
const authMiddleware = require('./middleware/authMiddleware.js');
const path = require('path');
const authRouter = require('./middleware/UserAuth.js');


const multer = require('multer');
const authenticateUser = require('./middleware/authenticateUser')

const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

// MongoDB connection
mongoose.connect('mongodb+srv://parthadam8016:sourav03@cluster0.iac9z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
mongoose.connection.on('connected', () => console.log('MongoDB connected'));

// app.use('/api', adminRoutes);

// Models
const Course = require('./models/Course');
const User = require('./models/User');
// const { default: App } = require('../courseall/src/App');


app.use('/uploads', express.static('uploads'));

// Middleware to authenticate JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};



app.post('/api/admin/payment-done', (req, res) => {
  console.log(req.body);  // Log the incoming request body
  const { courseId, userId, courseTitle, courseDescription } = req.body;
  
  if (!courseId || !userId || !courseTitle || !courseDescription) {
    return res.status(400).send('Missing required fields');
  }
  
  AdminCourse.create({ userId, courseId, courseTitle, courseDescription })
    .then(() => res.status(200).send('Payment processed and course added to admin section'))
    .catch(err => res.status(500).send(err.message));
});


// For the admin page, you can use this middleware to ensure that only admins can access it
app.get('/admin', authenticateAdmin, (req, res) => {
  AdminCourse.find()
    .populate('userId') // Populate userId if needed to get full user details
    .then((adminCourses) => {
      res.status(200).json(adminCourses); // Send the list of admin courses
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Failed to retrieve admin courses.' });
    });
});



  
// Routes

// User Registration

app.use('/api',authRouter);


app.get('/api/courses/:courseId', authenticateToken, async (req, res) => {
  const { courseId } = req.params;

  try {
    // Fetch course from the database
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Generate QR code containing the course ID
    const qrCodeData = `CourseID:${courseId}`;
    const qrCodeUrl = await QRCode.toDataURL(qrCodeData);

    res.json({
      qrCodeUrl,
      courseDetails: {
        title: course.title,
        description: course.description,
        price: course.price,
      },
    });
  } catch (error) {
    console.error('Error fetching course:', error); // Log the error
    res.status(500).json({ message: 'Error fetching course data' }); // Return a proper error response
  }
});





// Fetch Courses
app.get('/api/courses', async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// Create Course (for admin)
// app.post('/api/courses', authenticateToken, async (req, res) => {
//   if (req.user.role !== 'admin') return res.status(403).json({ message: 'Forbidden' });

//   const { title, description, image } = req.body;
//   const newCourse = new Course({ title, description, image });
//   await newCourse.save();
//   res.status(201).json(newCourse);
// });

// Handle QR Code for Course Payment
// app.get('/api/courses/:courseId', authenticateToken, (req, res) => {
//   const { courseId } = req.params;
//   const qrCodeUrl = `http://localhost:5000/qr/${courseId}`;
//   res.json({ qrCodeUrl });
// });

// Submit Payment (Assuming course is purchased)
app.post('/api/submit-payment', authenticateToken, async (req, res) => {
  const { courseId } = req.body;
  // Save purchase information in User model or separate purchases collection
  res.json({ message: 'Payment submitted' });
});

app.get('/api/user-role', authenticateAdmin, (req, res) => {
  const { role } = req.user;
  // console.log(role) // Extract role from decoded token
  res.json({ role });
});

app.get('/api/admin/courses', authenticateToken, async (req, res) => {
  try {
    const purchasedCourses = await AdminCourse.find();
    res.json(purchasedCourses);
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({ message: 'Failed to fetch purchased courses' });
  }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Save uploaded files in 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File name will be timestamp + original extension
  },
});

const upload = multer({ storage: storage });

app.post('/api/admin/upload', authMiddleware, upload.single('videoUrl'), async (req, res) => {
  const { courseId } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'No video file uploaded' });
  }

  // Generate the public-facing URL
  const videoUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename.replace(/\\/g, '/')}`;

  try {
    // Save video details to the database
    const newVideo = new Video({
      courseId,
      videoUrl,
      uploadedBy: req.user.id, // Assuming `req.user` contains admin details
    });

    await newVideo.save();

    res.status(201).json({ message: 'Video uploaded successfully', video: newVideo });
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video', error });
  }
});


// Fetch videos
app.get('/api/admin/list', async (req, res) => {
  try {
    const videos = await Video.find() // Find all videos
      .populate('courseId', 'title description') // Populate courseId with title and description fields
      .exec();

    // Map through videos and include course data along with video data
    const videosWithCourseDetails = videos.map(video => ({
      videoId: video._id,
      videoUrl: video.videoUrl,
      createdAt: video.createdAt,
      course: {
        title: video.courseId.title,
        description: video.courseId.description,
      }
    }));

    res.json(videosWithCourseDetails); // Send the populated video data along with course details as the response
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Error fetching videos', error });
  }
});



app.listen(5000, () => console.log('Server running on http://localhost:5000'));
