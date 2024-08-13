const express = require("express");
require("./models/database");
require("dotenv").config();
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {
  resp.send("App is Working");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
