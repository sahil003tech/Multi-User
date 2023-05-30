const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("../routes/registeruser");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { Connect } = require("../connect/db");
dotenv.config();
const PORT = 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

Connect();

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`${PORT} is on live`);
});
