const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportConfig = require("./config/passport.js");
const session = require("express-session");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");

require("dotenv").config();

const auth = require("./routes/auth");
const post = require("./routes/post");
const upload = require("./routes/upload");

const PORT = 3001;

let app = express();

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(express.static(path.join(__dirname, "../build")));

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());
passportConfig();
let corsOptions = {
  origin: true,
  credentials: true
};
app.use(cors(corsOptions));

// MongoDB 연결
mongoose
  .connect(
    "mongodb://localhost:27017/blog",
    { useNewUrlParser: true, promiseLibrary: require("bluebird") }
  )
  .then(() => console.log("Successfully Connect!"))
  .catch(err => console.error(err));

// 라우팅
app.use("/auth", auth);
app.use("/post", post);
app.use("/upload", upload);

// upload 폴더 경로 단순화
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  return res.end("Successfully Working API Server!");
});

app.use((req, res, next) => {
  let err = new Error("404 Not Found");
  err.status = 404;
  next(err);
});

// 활성화
app.listen(PORT);

module.exports = app;
