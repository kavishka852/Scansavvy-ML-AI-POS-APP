const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // Import the database connection function
const userRoutes = require("./routes/userRoutes"); // Import user routes
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
// Middleware
app.use(express.json()); // Middleware to parse JSON request bodies

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/users", userRoutes); // Register user routes

// Default route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const helmet = require("helmet");
app.use(helmet()); // Secure your app by setting HTTP headers
