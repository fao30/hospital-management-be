const AppError = require("../../helpers/AppError");
const ResponseHandler = require("../../helpers/response.handler");
const {
  usePassportStrategies,
} = require("../../service/passport/passport.service");
const logger = require("../../utils/logger");

const register = async (req, res) => {
  const response = new ResponseHandler(res);
  const result = await usePassportStrategies(req, res, "signup");
  try {
    if (result instanceof AppError) throw new AppError(400, result, 400);
    if (!result) throw new AppError(400, "Signup failed", 400);
    response.success({ user: result });
  } catch (err) {
    logger.error(err);
    response.error({ error: result, message: result.message }, 400);
  }
};

module.exports = register;
