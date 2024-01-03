const AppError = require("../../helpers/AppError");
const ResponseHandler = require("../../helpers/response.handler");
const {
  usePassportStrategies,
} = require("../../service/passport/passport.service");
const logger = require("../../utils/logger");

const register = async (req, res) => {
  const response = new ResponseHandler(res);
  console.log(req.body);
  const result = await usePassportStrategies(req, res, "signup");
  try {
    if (!result) throw new AppError(400, "Signup failed", 400);
    response.success(result);
  } catch (err) {
    logger.error(err);
    response.error(err, 400);
  }
};

module.exports = register;
