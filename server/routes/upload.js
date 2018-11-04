const express = require("express");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

let router = express.Router();

// TODO: 나중에 서버 주소 바뀌면 꼭 바꿀것
const serverUrl = process.env.serverURL;

// diskStorage 사용, fileName과 확장자 지정
let storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  }
});

let upload = multer({
  storage: storage
});

// 이미지 업로드
router.post("/create", upload.single("imgFile"), function(req, res, next) {
  let { filename, size, originalname, mimetype } = req.file;
  console.log(req.file);

  // 이미지 속성들
  let result = {
    type: mimetype,
    size: size,
    name: originalname,
    link: `${serverUrl}/uploads/${filename}`
  };

  res.json(result);
});

module.exports = router;
