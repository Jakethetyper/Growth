const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const path = require("path");
const User = require("./models/User");
const Expense = require("./models/Expense");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();

// Connect to MongoDB
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.post("/api/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(password);

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error registering user", details: error.message });
  }
});

app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    console.log(user.password);

    if (!user) {
      return res
        .status(401)
        .json({ error: "Authentication failed. User not found." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Authentication failed. Wrong password." });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    );

    res.json({ user, message: "Login successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in", details: error.message });
  }
});

app.post("/api/addExpense", async (req, res) => {
  try {
    const { email, name, cost, date, occurence, type } = req.body;
    const newCost = cost / occurence;

    const expense = {
      name: name,
      amount: newCost,
      date: date,
    };

    let newExpense = await Expense.findOne({ email: email });

    if (type === "expense") {
      if (!newExpense) {
        newExpense = new Expense({
          email: email,
          expenses: [expense],
        });
      } else {
        newExpense.expenses.push(expense);
      }
    } else if (type === "income") {
      if (!newExpense) {
        newExpense = new Expense({
          email: email,
          incomes: [expense],
        });
      } else {
        newExpense.incomes.push(expense);
      }
    } else {
      if (!newExpense) {
        newExpense = new Expense({
          email: email,
          investments: [expense],
        });
      } else {
        newExpense.investments.push({ name: name, amount: cost, date: date });
      }
    }

    await newExpense.save();

    return res
      .status(200)
      .json({ message: "Expense Added Successfully", expense: expense });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error Adding Expense", details: error.message });
  }
});

app.post("/api/getFinancialData", async (req, res) => {
  try {
    const { email } = req.body;

    const financials = await Expense.findOne({ email: email });

    return res.status(200).json({ financials: financials });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Error Fecthing Financial Information", details: error });
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
