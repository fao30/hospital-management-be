const { Medicines_Treatments, Sequelize } = require("../models");

class medicineTreatmentsService {
  static async createMedicineTreatment(query) {
    return Medicines_Treatments.create(query);
  }

  static async findAllMedicineTreatments() {
    return Medicines_Treatments.findAll({
      where: {
        // id: { [Sequelize.Op.not]: 1 },
      },
      attributes: {
        // exclude: ["createdAt", "updatedAt"],
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findMedicineTreatmentById(id) {
    return Medicines_Treatments.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteMedicineTreatment(id) {
    return Medicines_Treatments.destroy({ where: { id } });
  }
}

module.exports = medicineTreatmentsService;
