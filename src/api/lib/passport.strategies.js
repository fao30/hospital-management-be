const passport = require("passport");
const { Strategy: localStrategy } = require("passport-local");
const { signup } = require("../service/passport/passport.service");
const { jwtToken } = require("../utils/jwt");
const userService = require("../service/userService");
const logger = require("../utils/logger");
const AppError = require("../helpers/AppError");
const bcryptUtils = require("../utils/bcrypt");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },

    async (req, email, password, done) => {
      return await signup(req.body, done);
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },

    async (req, email, password, done) => {
      try {
        const user = await userService.findOneUser(email);
        if (!user) throw new AppError(404, "User not found", 404);
        const compare = await bcryptUtils.comparePassword(
          password,
          user.password
        );

        if (!compare) throw new AppError(400, "Incorrect password", 400);

        const token = jwtToken(user);
        return done(null, {
          token: token,
          id: user?.id,
          role_id: user?.role_id,
          hospital_id: user?.hospital_id,
        });
      } catch (err) {
        logger.error(err);
        return done(null, err);
      }
    }
  )
);

module.exports = passport;
