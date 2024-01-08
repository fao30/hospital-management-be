const { SUPER_ADMIN } = require("../constants/roles.const.js");
const { Users, Roles } = require("../models/index.js");
const bcryptService = require("../utils/bcrypt.js");
const { Op } = require("sequelize");

const include = [{}];

const attributes = {
  exclude: ["password", "createdAt", "updatedAt"],
};

const findOneUser = async (email) => {
  return await Users.findOne({
    where: { email },
    attributes: { exclude: ["doctor_id", "patient_id", "admin_id"] },
  });
};

const findUserQuery = async (query) => {
  return await Users.findAll({
    where: query,
    attributes: {
      exclude: ["doctor_id", "patient_id", "admin_id", "password"],
    },
  });
};

const findUserAndComparePassword = async (email, password) => {
  const user = await Users.findOne({
    where: { email },
    attributes: { exclude: ["doctor_id", "patient_id", "admin_id"] },
  });
  const comparePassword = await bcryptService.comparePassword(
    password,
    user.password
  );

  return { user, comparePassword };
};

const createUser = async (data) => {
  return Users.create(data, {
    returning: [
      "id",
      "first_name",
      "last_name",
      "id_number",
      "date_of_birth",
      "email",
      "password",
      "phone_number",
      "country_id",
      "role_id",
      "hospital_id",
      "is_active",
      "is_on_duty",
      "has_insurance",
    ],
  });
};

const register = async ({ email, password, ...body }) => {
  try {
    const userData = {
      ...body,
      email: email.toLowerCase(),
      password: await bcryptService.hashPassword(password),
      // is_active: false, // ONLY FOR DEV
      // is_subscribe: true,
    };
    const user = await Users.create(userData);

    return user;
  } catch (error) {
    return error;
  }
};

const findAllUsers = async (limit, page, req = null) => {
  const role_id_search = JSON.parse(req.query.role_id || false);
  const { hospital_id, role_id } = req.headers;

  let where = {};
  if (role_id !== SUPER_ADMIN) {
    where.hospital_id = hospital_id;
    where.role_id = {
      [Op.notIn]: [1, 5],
    };
  }
  if (role_id_search) {
    where.role_id = role_id_search;
  }

  return await Users.findAndCountAll({
    where,
    limit,
    offset: limit * page,
    include: [
      {
        model: Roles,
      },
    ],
    attributes: {
      exclude: [
        "createdAt",
        "updatedAt",
        "doctor_id",
        "patient_id",
        "admin_id",
        "password",
      ],
    },
  });
};

module.exports = {
  createUser,
  findUserAndComparePassword,
  findUserQuery,
  findOneUser,
  register,
  findAllUsers,
};
