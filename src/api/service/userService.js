const { Users } = require("../models/index.js");
const bcryptService = require("../utils/bcrypt.js");
const { Op } = require("sequelize");

const include = [{}];

const attributes = {
  exclude: ["password", "createdAt", "updatedAt"],
};

const findOneUser = async ({ query }) => {
  return await Users.findOne({ where: query });
};

const findUserQuery = async (query) => {
  return await Users.findAll({ where: query });
};

const findUserAndComparePassword = async (email, password) => {
  const user = await Users.findOne({ where: { email } });
  const comparePassword = await bcryptService.comparePassword(
    password,
    user.password,
  );

  return { user, comparePassword };
};

const createUser = async (data) => {
  return Users.create(data);
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

module.exports = {
  createUser,
  findUserAndComparePassword,
  findUserQuery,
  findOneUser,
  register,
};
