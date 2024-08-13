const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://NateWilli:People10@cluster0.qp5vr.mongodb.net/",
  {}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected");
});
