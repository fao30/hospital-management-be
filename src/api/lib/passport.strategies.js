const passport = require("passport");
const { Strategy: localStrategy } = require("passport-local");
const { signup } = require("../service/passport/passport.service");
const { jwtToken } = require("../utils/jwt");
const { comparePassword } = require("../utils/bcrypt");
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
    },
  ),
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
      const user = await userService.findOneUser({ email });
      console.log(user.password);
      const compare = await bcryptUtils.comparePassword(
        password,
        user.password,
      );

      try {
        if (!user) throw new AppError(404, "User not found", 404);
        if (!compare) throw new AppError(400, "Incorrect password", 400);

        const token = jwtToken(user);
        return done(null, token);
      } catch (err) {
        logger.error(err);
        done(err, null);
      }
    },
  ),
);

module.exports = passport;
