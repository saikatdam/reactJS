const mongoose = require('mongoose');
const Course = require('./models/Course');  // Import the Course model
const User = require('./models/User')
const bcrypt = require('bcryptjs');
// Connect to MongoDB
mongoose.connect('mongodb+srv://parthadam8016:sourav03@cluster0.iac9z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connected to MongoDB');
    // seedCourses();
    insertAdmin();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Define course data
const courses = [
  {
    title: 'React for Beginners',
    description: 'Learn the basics of React, including components, hooks, and state management.',
    image: 'https://www.patterns.dev/img/reactjs/react-logo@3x.svg',
    price:1200
  },
  {
    title: 'Advanced JavaScript',
    description: 'Dive deep into JavaScript concepts like closures, promises, and async/await.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEFsN-FaMzyQLVj387F8MixGGSaOwItLO0tg&s',
    price:4200
  },
  {
    title: 'Full Stack Development with MERN',
    description: 'Learn to build full-stack web applications using MongoDB, Express, React, and Node.js.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6g10Sw9do2EIowWd7Uugp_Vq2fVH5DT50Sg&s',
    price:3100
  },
  {
    title: 'Python for Data Science',
    description: 'A comprehensive course on using Python for data analysis, machine learning, and data visualization.',
    image: 'https://miro.medium.com/v2/resize:fit:1400/1*cG6U1qstYDijh9bPL42e-Q.jpeg',
    price:3211
  },
  {
    title: 'Introduction to Web Development',
    description: 'Learn HTML, CSS, and JavaScript to build static websites and web pages.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzkNuKl_FQmwo0jVqeI5_l7-mYIpizD2SOEQ&s',
    price:1449
  },
];

// Function to seed courses into the database
// const seedCourses = async () => {
//   try {
//     // Delete existing courses to avoid duplicates
//     await Course.deleteMany();

//     // Insert the new courses
//     await Course.insertMany(courses);
//     console.log('Courses seeded successfully!');
//     mongoose.connection.close();
//   } catch (error) {
//     console.error('Error seeding courses:', error);
//     mongoose.connection.close();
//   }
// };



const insertAdmin = async ()=>{


  try{
   await new User({
    email:"adminsaikatdam@gmail.com",
    
    role:'admin'
   }
   )
   console.log("insertion done")
  }catch(err){
    console.log(err);
    mongoose.connection.close();
  }

}

