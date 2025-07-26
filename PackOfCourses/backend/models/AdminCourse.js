const mongoose = require('mongoose');

const AdminCourseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course', // Assuming you have a Course model
    required: true,
  },
  courseTitle: {
    type: String,
    required: true,
  },
  courseDescription: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('AdminCourse', AdminCourseSchema);
