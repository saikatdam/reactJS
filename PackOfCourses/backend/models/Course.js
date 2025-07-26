const mongoose = require('mongoose');

// Define the course schema
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true }, // Optional: If you're managing pricing
  purchasedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Store users who bought the course
});

// Create and export the Course model
module.exports = mongoose.model('Course', courseSchema);
