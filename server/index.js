const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cron = require("node-cron");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5173;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser("zicketyStockYe"));

app.get("/", (req, res) => {
  res.json("Let's get it");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

app.listen(PORT, async () => {
  const fetch = (await import("node-fetch")).default;
  console.log(`Server is running on PORT ${PORT}`);
});
