const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
  },
  email: {
    type: String,
    required: [true],
    unique: [true, "Email Already Is Linked To Another Account"],
  },

  username: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

module.exports = mongoose.model("User Schema",userSchema);
