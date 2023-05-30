const jwt = require("jsonwebtoken");
const model = require("../models/userSchema");
const sendToken = require("../utility/jwttoken");
const secertkey = "sahil2002";

const loginuser = async (req, res) => {
  try {
    const { mail, password } = req.body;
    if (!mail || !password) {
      res.text("please provide mail and password");
    }
    const data = await model.findOne({ umail: mail });
    console.log("login data=========", data);
    if (!data) {
      res.json({ message: "user does not exits" });
    }
    console.log("login user data", data);
    sendToken(data, 201, res);
  } catch (error) {
    console.log("login user error", error);
  }
};

module.exports = loginuser;
