const { Hospitals, Sequelize } = require("../models");

class HospitalsService {
  static async createHospital(query) {
    return Hospitals.create(query, {
      returning: [
        "id",
        "name",
        "address",
        "phone_number",
        "is_active",
        "max_users",
        "createdAt",
        "updatedAt",
      ],
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
