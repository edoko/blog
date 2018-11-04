const KakaoStrategy = require("passport-kakao").Strategy;
const User = require("../models/user.js");
require("dotenv").config();

module.exports = passport => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: "/auth/kakao/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const exUser = await User.findOne({
            snsId: profile.id,
            provider: "kakao"
          });
          if (exUser) {
            console.log("done(null, exUser)");
            done(null, exUser);
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kaccount_email,
              nick: profile.displayName,
              snsId: profile.id,
              provider: "kakao"
            });
            console.log("done(null, newUser)");
            done(null, newUser);
          }
        } catch (error) {
          console.log(error);
          done(error);
        }
      }
    )
  );
};
