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
    if (!result) throw new AppError(400, "Cannot login", 400);
    response.success(result);
  } catch (err) {
    logger.error(err);
    response.error(err, 400);
  }
};

module.exports = login;
