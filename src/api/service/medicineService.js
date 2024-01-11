const { SUPER_ADMIN } = require("../constants/roles.const");
const { Medicines, Sequelize } = require("../models");

class MedicinesService {
  static async createMedicine(query) {
    return Medicines.create(query);
  }

  static async findAllMedicines(limit, page, req = null) {
    const { hospital_id, role_id } = req.headers;
    const created_at = req?.query?.created_at;
    let order = [["createdAt", "ASC"]];

    let where = {};
    if (role_id !== SUPER_ADMIN) {
      where.hospital_id = hospital_id;
    }
    if (created_at) {
      order = [["createdAt", created_at]];
    }

    return Medicines.findAndCountAll({
      where,
      limit,
      offset: limit * page,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order,
    });
  }

  static async findMedicineById(req, id) {
    const { role_id, hospital_id } = req?.headers;

    return Medicines.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteMedicine(id) {
    return Medicines.destroy({ where: { id } });
  }
}

module.exports = MedicinesService;
