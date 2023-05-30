const jwt = require("jsonwebtoken");
const mysecertkey = "sahil2002";

const validate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, mysecertkey, (err, user) => {
      if (err) {
        return res.status(404).json("token invalid");
      } else {
        console.log(user);
        req.user = user;
        next();
      }
    });
  } else {
    res.json("you are authenticated");
  }
};

module.exports = validate;
