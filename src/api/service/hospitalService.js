const { Hospitals, Sequelize } = require("../models");

class HospitalsService {
  static async createHospital(query) {
    return Hospitals.create(query, {
      attributes: { exclude: ["hospital_id"] },
    });
  }

  static async findAllHospitals() {
    return Hospitals.findAll({
      where: {
        // id: { [Sequelize.Op.not]: 1 },
      },
      attributes: {
        // exclude: ["createdAt", "updatedAt"],
        exclude: ["createdAt", "updatedAt", "hospital_id"],
      },
    });
  }

  static async findHospitalById(id) {
    return Hospitals.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt", "hospital_id"],
      },
    });
  }

  static async deleteHospital(id) {
    return Hospitals.destroy({ where: { id } });
  }
}

module.exports = HospitalsService;
