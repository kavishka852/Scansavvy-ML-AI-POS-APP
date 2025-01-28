// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require("bcrypt");
// // Create a new user
// router.post("/register", async (req, res) => {
//     const { name, email, password } = req.body;
  
//     try {
//       // Hash the password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const user = new User({ name, email, password: hashedPassword });
  
//       await user.save();
//       res.status(201).json({ message: "User created successfully" });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

// module.exports = router;

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { loginUser } = require("../controllers/userController");

const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/users/login
router.post('/login', loginUser);

module.exports = router;
