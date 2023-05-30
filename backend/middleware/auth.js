const model = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const secertkey = "sahil2002";
exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(req.cookies);
  if (!token) {
    res.json({ message: "please login" });
  }
  const decode = jwt.verify(token, secertkey);

  req.user = await model.findById(decode.id);

  next();
};
