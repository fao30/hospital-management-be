const { Treatments, Sequelize } = require("../models");

class TreatmentsService {
  static async createTreatment(query) {
    return Treatments.create(query);
  }

  static async findAllTreatments() {
    return Treatments.findAll({
      where: {
        // id: { [Sequelize.Op.not]: 1 },
      },
      attributes: {
        // exclude: ["createdAt", "updatedAt"],
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findTreatmentById(id) {
    return Treatments.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteTreatment(id) {
    return Treatments.destroy({ where: { id } });
  }
}

module.exports = TreatmentsService;
