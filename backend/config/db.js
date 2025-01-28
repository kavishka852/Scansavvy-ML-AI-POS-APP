const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from the .env file

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`); // Log the host on successful connection
  } catch (error) {
    console.error(`Error: ${error.message}`); // Log the error message if connection fails
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = connectDB;
