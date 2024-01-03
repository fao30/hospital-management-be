const _ = require("lodash");
const userService = require("../service/userService");
const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;
const localStrategy = require("passport-local");
// const AppError = require('../helpers/appError.js');
// const {
//   experienceDataRefactor,
//   educationDataRefactor,
//   honorDataRefactor,
//   skillDataRefactor,
//   userDataRefactor,
// } = require("../helpers/data-refactor.js");
require("../../../dotEnvInit");

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      return register(req.body, done);
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      console.log("EELMALKAKJDFMALKMDKLAWMDKLAMWDMKLW");
      try {
        const { user, comparePassword } =
          await userService.findUserAndComparePassword(email, password);

        if (!comparePassword)
          return done(null, false, { message: "login failed" });

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// passport.use(
//   new JWTStrategy(
//     {
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     },
//     async (token, done) => {
//       try {
//         return done(null, token.user);
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

module.exports = passport;
