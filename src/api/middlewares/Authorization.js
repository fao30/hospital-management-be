const AppError = require("../helpers/AppError");
const jwt = require("../utils/jwt");
const logger = require("../utils/logger");
const userService = require("../services/user.service");

const auth = (req) => {
  try {
    const bearer = req.headers["authorization"];
    if (!bearer) throw new AppError(400, "Invalid bearer token", 400);

    const token = bearer.split(" ")[1];

    if (!token) throw new AppError(401, "Unauthorized", 401);
    const { id, email, role } = jwt.decodeToken(token);

    return { id, email, role };
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};

const authPublic = (req) => {
  try {
    const bearer = req.headers["authorization"];

    if (!bearer) return { id: "", email: "", role: "" };
    const token = bearer.split(" ")[1];
    if (!token) throw new AppError(401, "Unauthorized", 401);
    const { id, email, role } = jwt.decodeToken(token);

    return { id, email, role };
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const { id, email, role, error } = auth(req);
    if (!id) throw new AppError(401, "Token data is expired");

    const query = {
      id,
      email,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);

    if (role !== 3 && role !== 1) throw new AppError(401, "Unauthorized", 401);

    if (error) throw new AppError(400, "There is no token found", 400);

    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(error.errorCode || 500)
      .json({ error: true, message: error.message });
  }
};

const isSuperAdmin = async (req, res, next) => {
  try {
    const { id, email, role, error } = auth(req);
    if (!id) throw new AppError(401, "Token decode error", 401);

    const query = {
      id,
      email,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);

    if (role !== 1) throw new AppError(401, "Unauthorized", 401);

    if (error) throw new AppError(400, "There is no token found", 400);

    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(error.errorCode || 500)
      .json({ error: true, message: error.message });
  }
};

const isAuthorized = async (req, res, next) => {
  try {
    const { id, email, role, error } = auth(req);

    if (!id) throw new AppError(400, "Token decode error", 404);

    // const query = {
    //     id,
    //     email,
    // };
    const query = {
      id,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);

    if (role !== 1 && role !== 2 && role !== 3) {
      throw new AppError(401, "Unauthorized", 401);
    }
    if (error) throw new AppError(400, "There is no token found", 400);

    req.headers = {
      id,
      email,
      role,
    };

    next();
  } catch (error) {
    logger.error(error);
    return res.json({ error, message: error.message });
  }
};

const getJwtToken = async (req, res, next) => {
  try {
    const { id, email, role } = authPublic(req);

    req.headers = {
      id,
      email,
      role,
    };

    next();
  } catch (error) {
    logger.error(error);
    return res.json({ error, message: error.message });
  }
};

module.exports = { isAdmin, isSuperAdmin, isAuthorized, auth, getJwtToken };
