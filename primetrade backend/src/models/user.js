const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  emailId: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// hashing before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  console.log("Hashing password for:", this.emailId); // 👈 add this line
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//Comparing passwords
userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

// Generating JWT token
userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

module.exports = mongoose.model("User", userSchema);
