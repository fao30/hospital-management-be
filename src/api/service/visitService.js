const { Visits, Sequelize } = require("../models");

class VisitsService {
  static async createVisit(query) {
    return Visits.create(query);
  }

  static async findAllVisits() {
    return Visits.findAll({
      where: {
        // id: { [Sequelize.Op.not]: 1 },
      },
      attributes: {
        // exclude: ["createdAt", "updatedAt"],
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findVisitById(id) {
    return Visits.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteVisit(id) {
    return Visits.destroy({ where: { id } });
  }
}

module.exports = VisitsService;
