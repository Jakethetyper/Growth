const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const path = require("path");
const User = require("./models/User"); // Assuming User is in the models directory
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware to parse JSON
app.use(express.json());

// CORS Middleware
app.use(cors({ origin: "http://localhost:5173" }));

// API Routes
// User Registration
app.post("/api/register", async (req, res) => {
  console.log("hi");
  try {
    console.log("hello");
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      console.log("error");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ error: "Error registering user", details: error.message });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  // Serve the frontend's index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "dist", "index.html"));
  });
}

// Define the port for the backend server
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));