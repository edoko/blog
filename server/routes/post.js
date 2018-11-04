const express = require("express");
const passport = require("passport");
require("../config/passport.js")(passport);
const Post = require("../models/post.js");
//const request = require("request");

let router = express.Router();

// 토큰 가져오기
const getToken = async req => {
  if (req.hasOwnProperty("user")) return req.user;
  throw new Error("Can't found valid token.");
};

// 게시글 리스트 가져오기
router.get("/", (req, res, next) => {
  Post.find()
    // 내림차순 정렬 (최신글이 위로 올라오게끔)
    .sort({ date: -1 })
    .exec((err, list) => {
      if (err) return next(err);
      res.json(list);
    });
});

// 게시글 페이징 가져오기 (한페이지에 12개씩)
router.get("/pages/:id", (req, res, next) => {
  Post.find()
    // 내림차순 정렬 (최신글이 위로 올라오게끔)
    .sort({ date: -1 })
    .skip((req.params.id - 1) * 12)
    .limit(12)
    .exec((err, list) => {
      if (err) return next(err);
      res.json(list);
    });
});

// 페이지 전체 개수 가져오기
router.get("/pages", (req, res, next) => {
  Post.find()
    .countDocuments()
    .exec((err, list) => {
      if (err) return next(err);
      res.json(list);
    });
});

// 개별 게시글 가져오기
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// 게시글 저장
router.post(
  "/",
  //passport.authenticate("kakao", { session: false }),
  async (req, res, next) => {
    //console.log(req.headers);
    try {
      await getToken(req);
      const post = await Post.create(req.body);
      res.json(post);
      //next();
    } catch (err) {
      console.error(err);
      return res.status(403).send({ success: false, msg: "Unauthorized." });
    }
  }
);

// 게시글 수정
router.put("/:id", (req, res, next) => {
  Post.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

// 게시글 삭제
router.delete("/:id", (req, res, next) => {
  Post.findByIdAndRemove(req.params.id, req.body, (err, post) => {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
