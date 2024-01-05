const AppError = require("../../helpers/AppError");
const { hashPassword } = require("../../utils/bcrypt");
const logger = require("../../utils/logger");
const userService = require("../userService");
const passport = require("passport");

exports.usePassportStrategies = (req, res, strategy) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(strategy, { session: false }, async (err, user) => {
      if (err) {
        return reject(err);
      }

      return resolve(user);
    })(req, res);
  });
};

exports.signup = async ({ email, password, ...restBody }, done) => {
  const userToCreate = {
    ...restBody,
    email: email.toLowerCase(),
    password: await hashPassword(password),
  };

  const duplicate = await userService.findOneUser(email);

  const user = await userService.createUser(userToCreate);
  try {
    if (duplicate) throw new AppError(400, "User already register", 400);
    if (!user) throw new AppError(400, "Cannot create user", 400);

    return done(null, user);
  } catch (err) {
    logger.error(err);
    return done(null, err);
  }
};
