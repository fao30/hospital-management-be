const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const { NO_CONTENT, BAD_REQUEST } = require("../../constants/statusCode");
const AppError = require("../../helpers/AppError");
const errorMiddleware = require("../../middlewares/ErrorMiddleware");
const login = require("../../controllers/user/login");

// ------------------ TRY NEW CONTROLLER -----------
// router.post("/", async (req, res, next) => {
//   passport.authenticate("login", async (err, user, info) => {
//     if (err || !user) {
//       throw new AppError(NO_CONTENT, "User is undefined");
//     }
//
//     req.login(user, { session: false }, async (err) => {
//       if (err) return next(err);
//       const payload = {
//         id: user.id,
//         email: user.email,
//         role_id: user.role_id,
//         hospital_id: user?.hospital_id || null,
//       };
//       const token = generateAccessToken(payload);
//       const refresh_token = generateRefreshToken(payload);
//
//       const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//
//       if (_.isEmpty(verify.user)) {
//         throw new AppError(BAD_REQUEST, "user and password undefined");
//       }
//
//       return res.json({ token, refresh_token });
//     });
//   })(req, res, next);
// });

router.post("/", login);

router.post("/refresh", async (req, res, next) => {
  const refreshToken = req.body.refresh_token;

  try {
    const decoded = jwt.verify(refreshToken, process.env.ACCESS_TOKEN_SECRET);
    // const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // If the refresh token is valid, generate a new access token
    const payload = decoded.user;
    const token = generateAccessToken(payload);

    return res.json({ token });
  } catch (err) {
    throw new AppError(UNAUTHORIZED, "Invalid or expired refresh token");
  }
});

function generateAccessToken(payload) {
  return jwt.sign({ user: payload }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d", // Set the desired expiration time
  });
}

function generateRefreshToken(payload) {
  return jwt.sign({ user: payload }, process.env.ACCESS_TOKEN_SECRET, {
    // return jwt.sign({ user: payload }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d", // Set the desired expiration time
  });
}

router.use(errorMiddleware);

module.exports = router;
