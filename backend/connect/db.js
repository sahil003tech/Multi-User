const mongoose = require("mongoose");

const Connect = () => {
  mongoose.connect(process.env.MONGO_URI).then(() => console.log("connected"));
};

module.exports = { Connect };
