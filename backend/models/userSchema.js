const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  uname: { type: String, required: true },
  umail: { type: String, required: true },
  upassword: { type: String, required: true },
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, "sahil2002", { expiresIn: "7d" });
};

module.exports = mongoose.model("registeruser", userSchema);
