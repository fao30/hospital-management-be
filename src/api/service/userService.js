const { Users } = require("../models/index.js");
const bcryptService = require("../utils/bcrypt.js");
const { Op } = require("sequelize");

const include = [{}];

const attributes = {
  exclude: ["password", "createdAt", "updatedAt"],
};

const findUserAndComparePassword = async (email, password) => {
  const user = await Users.findOne({ where: { email } });
  const comparePassword = await bcryptService.comparePassword(
    password,
    user.password
  );

  return { user, comparePassword };
};

module.exports = {
  findUserAndComparePassword,
};
