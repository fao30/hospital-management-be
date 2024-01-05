const { Medicines, Sequelize } = require("../models");

class MedicinesService {
  static async createMedicine(query) {
    return Medicines.create(query);
  }

  static async findAllMedicines() {
    return Medicines.findAll({
      where: {
        // id: { [Sequelize.Op.not]: 1 },
      },
      attributes: {
        // exclude: ["createdAt", "updatedAt"],
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findMedicineById(id) {
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
