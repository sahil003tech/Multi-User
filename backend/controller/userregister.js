const model = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const sendmail = require("../utility/sendmail");
const secertkey = "sahil2002";

const userRegister = async (req, res) => {
  const { name, mail, password } = req.body;
  const user = await model.findOne({ umail: mail });
  if (user) {
    res.json("user already exists");
  } else {
    const user = req.body;
    const activate = createActivationToken(user);
    console.log(activate);
    const activartionUrl = `http://localhost:3000/activation/${activate}`;
    try {
      await sendmail({
        email: mail,
        subject: "activate your account",
        message: `please activate your account ${activartionUrl} `,
      });
      res.status(200).json({
        success: true,
        message: `please activate your account ${user.mail}`,
      });
    } catch (error) {
      console.log("user error", error);
    }
  }
};

const createActivationToken = (user) => {
  return jwt.sign(user, secertkey, { expiresIn: "5m" });
};

module.exports = userRegister;
