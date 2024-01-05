const AppError = require("../../helpers/AppError");
const ResponseHandler = require("../../helpers/response.handler");
const {
  usePassportStrategies,
} = require("../../service/passport/passport.service");
const logger = require("../../utils/logger");

const login = async (req, res) => {
  const response = new ResponseHandler(res);
  const result = await usePassportStrategies(req, res, "login");
  try {
    if (result instanceof AppError) throw new AppError(404, result, 400);
    if (!result) throw new AppError(400, "Cannot login", 400);
    response.success(result);
  } catch (err) {
    logger.error(err);
    response.error({ error: err, message: result.message }, err.errorCode);
  }
};

module.exports = login;
