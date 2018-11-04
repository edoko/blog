const passport = require("passport");
const kakao = require("./kakaoStrategy");
const User = require("../models/user.js");

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user);
  });

  passport.deserializeUser((id, done) => {
    User.findOne(
      {
        _id: id
      },
      "email name nick provider snsId",
      (err, user) => {
        console.log("======DESERIALIZE========");
        console.log(user);
        done(null, user);
      }
    );
  });

  kakao(passport);
};
