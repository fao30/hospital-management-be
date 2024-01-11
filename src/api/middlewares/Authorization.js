const {
  ADMIN_HOSPITAL,
  MANAGER_HOSPITAL,
  SUPER_ADMIN,
  DOCTOR,
  PATIENT,
  PHARMACIST,
} = require("../../api/constants/roles.const");
const AppError = require("../helpers/AppError");
const jwt = require("../../api/utils/jwt");
const logger = require("../../api/utils/logger");
const userService = require("../../api/service/userService");

// const auth = (req) => {
//   try {
//     const bearer = req.headers["authorization"];
//     if (!bearer) throw new AppError(400, "Invalid bearer token", 400);

//     const token = bearer.split(" ")[1];

//     if (!token) throw new AppError(401, "Unauthorized", 401);
//     const { id, email, role } = jwt.decodeToken(token);

//     return { id, email, role };
//   } catch (error) {
//     logger.error(error.message);
//     return error;
//   }
// };

const authPublic = (req) => {
  try {
    const bearer = req.headers["authorization"];

    if (!bearer) return { id: "", email: "", role_id: "" };
    const token = bearer.split(" ")[1];

    if (!token) throw new AppError(401, "Unauthorized", 401);
    const { id, email, role_id, hospital_id } = jwt.decodeToken(token);
    return { id, email, role_id, hospital_id };
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};

const isAdminOrManager = async (req, res, next) => {
  try {
    const { id, email, role_id, error, hospital_id } = authPublic(req);
    if (!id) throw new AppError(401, "Token data is expired");

    const query = {
      id,
      email,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);

    if (
      role_id !== MANAGER_HOSPITAL &&
      role_id !== SUPER_ADMIN &&
      role_id !== ADMIN_HOSPITAL
    ) {
      //IF ROLE IS NOT ADMIN HOSPITAL, SUPER ADMIN, OR MANAGER HOSPITAL
      throw new AppError(401, "Unauthorized", 401);
    }

    if (error) throw new AppError(400, "There is no token found", 400);

    req.headers = {
      id,
      email,
      role_id,
      hospital_id,
    };

    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(error.errorCode || 500)
      .json({ error: true, message: error.message });
  }
};

const isDoctor = async (req, res, next) => {
  try {
    const { id, email, role_id, hospital_id, error } = authPublic(req);
    if (!id) throw new AppError(401, "Token data is expired");

    const query = {
      id,
      email,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);

    if (role_id !== DOCTOR && role_id !== SUPER_ADMIN) {
      //IF ROLE IS NOT DOCTOR, SUPER ADMIN
      throw new AppError(401, "Unauthorized", 401);
    }

    if (error) throw new AppError(400, "There is no token found", 400);

    req.headers = {
      id,
      email,
      role_id,
      hospital_id,
    };

    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(error.errorCode || 500)
      .json({ error: true, message: error.message });
  }
};

const isDoctorOrAdminOrManager = async (req, res, next) => {
  try {
    const { id, email, role_id, hospital_id, error } = authPublic(req);
    if (!id) throw new AppError(401, "Token data is expired");

    const query = {
      id,
      email,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);

    if (
      role_id !== DOCTOR &&
      role_id !== MANAGER_HOSPITAL &&
      role_id !== SUPER_ADMIN &&
      role_id !== ADMIN_HOSPITAL
    ) {
      //IF ROLE IS NOT DOCTOR, SUPER ADMIN, ADMIN HOSPITAL, MANAGER HOSPITAL
      throw new AppError(401, "Unauthorized", 401);
    }

    if (error) throw new AppError(400, "There is no token found", 400);

    req.headers = {
      id,
      email,
      role_id,
      hospital_id,
    };

    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(error.errorCode || 500)
      .json({ error: true, message: error.message });
  }
};

const isPharmacistOrAdminOrManagerOrDoctor = async (req, res, next) => {
  try {
    const { id, email, role_id, error, hospital_id } = authPublic(req);
    if (!id) throw new AppError(401, "Token data is expired");

    const query = {
      id,
      email,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);
    if (
      role_id !== PHARMACIST &&
      role_id !== MANAGER_HOSPITAL &&
      role_id !== SUPER_ADMIN &&
      role_id !== ADMIN_HOSPITAL &&
      role_id !== DOCTOR //change it later
    ) {
      //IF ROLE IS NOT PHARMACIST, SUPER ADMIN, ADMIN HOSPITAL, MANAGER HOSPITAL
      throw new AppError(401, "Unauthorized", 401);
    }

    if (error) throw new AppError(400, "There is no token found", 400);

    req.headers = {
      id,
      email,
      role_id,
      hospital_id,
    };

    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(error.errorCode || 500)
      .json({ error: true, message: error.message });
  }
};

const isPharmacistOrAdminOrManager = async (req, res, next) => {
  try {
    const { id, email, role_id, error, hospital_id } = authPublic(req);
    if (!id) throw new AppError(401, "Token data is expired");

    const query = {
      id,
      email,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);
    if (
      role_id !== PHARMACIST &&
      role_id !== MANAGER_HOSPITAL &&
      role_id !== SUPER_ADMIN &&
      role_id !== ADMIN_HOSPITAL
    ) {
      //IF ROLE IS NOT PHARMACIST, SUPER ADMIN, ADMIN HOSPITAL, MANAGER HOSPITAL
      throw new AppError(401, "Unauthorized", 401);
    }

    if (error) throw new AppError(400, "There is no token found", 400);

    req.headers = {
      id,
      email,
      role_id,
      hospital_id,
    };

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
    const { id, email, role_id, error } = authPublic(req);

    if (!id) throw new AppError(401, "Token decode error", 401);

    const query = {
      id,
      email,
    };
    const user = await userService.findUserQuery(query);

    if (!user) throw new AppError(404, "User not found", 404);

    if (role_id !== SUPER_ADMIN) throw new AppError(401, "Unauthorized", 401);

    if (error) throw new AppError(400, "There is no token found", 400);

    next();
  } catch (error) {
    logger.error(error);
    return res
      .status(error.errorCode || 500)
      .json({ error: true, message: error.message });
  }
};

// const isAuthorized = async (req, res, next) => {
//   try {
//     const { id, email, role, error } = auth(req);

//     if (!id) throw new AppError(400, "Token decode error", 404);

//     // const query = {
//     //     id,
//     //     email,
//     // };
//     const query = {
//       id,
//     };
//     const user = await userService.findUserQuery(query);

//     if (!user) throw new AppError(404, "User not found", 404);

//     if (role !== ADMIN && role !== JOB_SEEKER && role !== SUPER_ADMIN) {
//       throw new AppError(401, "Unauthorized", 401);
//     }
//     if (error) throw new AppError(400, "There is no token found", 400);

//     req.headers = {
//       id,
//       email,
//       role,
//     };

//     next();
//   } catch (error) {
//     logger.error(error);
//     return res.json({ error, message: error.message });
//   }
// };

const getJwtToken = async (req, res, next) => {
  try {
    const { id, email, role_id, hospital_id } = authPublic(req);

    req.headers = {
      id,
      email,
      role_id,
      hospital_id,
    };

    next();
  } catch (error) {
    logger.error(error);
    return res.json({ error, message: error.message });
  }
};

module.exports = {
  getJwtToken,
  isSuperAdmin,
  isAdminOrManager,
  isDoctorOrAdminOrManager,
  isDoctor,
  isPharmacistOrAdminOrManager,
  isPharmacistOrAdminOrManagerOrDoctor,
};
