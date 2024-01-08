const { SUPER_ADMIN } = require("../constants/roles.const.js");
const { Users, Roles } = require("../models/index.js");
const bcryptService = require("../utils/bcrypt.js");
const { Op } = require("sequelize");

const include = [{}];

const attributes = {
  exclude: ["password", "createdAt", "updatedAt"],
};

const searchByKeywords = async (req) => {
  const user_first_name = req.query.user_first_name || false;
  const user_last_name = req.query.user_last_name || false;
  const user_phone_number = req.query.user_phone_number || false;
  const user_id_number = req.query.user_id_number || false;

  let where = {};

  if (user_first_name) {
    where.first_name = {
      [Op.like]: `%${user_first_name}%`,
    };
  } else if (user_last_name) {
    where.last_name = {
      [Op.like]: `%${user_last_name}%`,
    };
  } else if (user_phone_number) {
    where.phone_number = {
      [Op.like]: `%${user_phone_number}%`,
    };
  } else if (user_id_number) {
    where.id_number = {
      [Op.like]: `%${user_id_number}%`,
    };
  }

  if (
    user_first_name ||
    user_last_name ||
    user_phone_number ||
    user_id_number
  ) {
    return await Users.findAll({
      where,
      attributes: {
        exclude: ["doctor_id", "patient_id", "admin_id", "password"],
      },
    });
  }
  return [];
};

module.exports = {
  searchByKeywords,
};
