const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://jacobjennings7991:Jakejennings@cluster0.nhrmzof.mongodb.net/",
  {}
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected");
});
