const express = require("express");
const userRegister = require("../controller/userregister");
const loginuser = require("../controller/loginuser");
const validate = require("../middleware/validate");
const logout = require("../controller/logout");
const model = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const sendToken = require("../utility/jwttoken");
const { isAuthenticated } = require("../middleware/auth");
const secertkey = "sahil2002";

const router = express.Router();

router.post("/user", userRegister);
router.post("/login", loginuser);
router.post("/logout", validate, logout);
router.post("/activation", async (req, res) => {
  try {
    const { activation_token } = req.body;
    console.log("access token +++++++++++++", activation_token);
    const new_user = jwt.verify(activation_token, secertkey);

    if (!new_user) {
      res.send("invalid token", 404);
    }

    const { name, mail, password } = new_user;
    let use = model.findOne({ umail: mail });
    if (use) {
      res.json("user already exists");
    }
    use = await model.create({
      uname: name,
      umail: mail,
      upassword: password,
    });
    console.log("user create", use);
    sendToken(use, 201, res);
  } catch (error) {
    console.log("error while creating a user", error);
  }
});

router.get("/getuser", isAuthenticated, async (req, res) => {
  try {
    const user = await model.findById(req.user.id);

    if (!user) {
      res.json({ message: "user not login" });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;
