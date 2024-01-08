const { SUPER_ADMIN, PATIENT } = require("../constants/roles.const.js");
const { Users, Roles } = require("../models/index.js");
const bcryptService = require("../utils/bcrypt.js");
const { Op } = require("sequelize");

const include = [{}];

const attributes = {
  exclude: ["password", "createdAt", "updatedAt"],
};

const searchUserByKeywords = async (req) => {
  const key_words = req.query.key_words || false;
  const hospital_id = req.headers.hospital_id || false;
  const role_id_requester = req.headers.role_id || false;
  const role_id = req.query.role_id || false;
  console.log(req.headers);

  let where = {};

  if (key_words) {
    where[Op.or] = [
      { first_name: { [Op.like]: `%${key_words}%` } },
      { last_name: { [Op.like]: `%${key_words}%` } },
      { id_number: { [Op.like]: `%${key_words}%` } },
      { phone_number: { [Op.like]: `%${key_words}%` } },
    ];
  }

  if (role_id_requester !== SUPER_ADMIN) {
    if (role_id !== PATIENT) {
      //IF NOT LOOKING FOR PATIENT, THEN ONLY SHOW IT OWNS HOSPITAL USER LIST
      where.hospital_id = hospital_id;
    }
    where.role_id = role_id;
  }

  return await Users.findAll({
    where,
    attributes: {
      exclude: ["doctor_id", "patient_id", "admin_id", "password"],
    },
  });
};

module.exports = {
  searchUserByKeywords,
};
