const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    lastname: String,
    email: String,
    password: String,
    roles: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }]
  })
);

module.exports = User;
