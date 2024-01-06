const { SUPER_ADMIN } = require("../constants/roles.const");
const {
  Treatments,
  Medicines_Treatments,
  Visits,
  Sequelize,
  Schedules,
} = require("../models");

class SchedulesService {
  static async createSchedule(query) {
    return Schedules.create(query);
  }

  static async findAllSchedules(req) {
    // const { hospital_id, role_id } = req.headers;

    return Schedules.findAll({
      where,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      // include: [
      //   {
      //     model: Treatments,
      //     order: [["createdAt", "DESC"]],
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      //   {
      //     model: Medicines_Treatments,
      //     order: [["createdAt", "DESC"]],
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      // ],
    });
  }

  static async findScheduleById(id) {
    return Schedules.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      // include: [
      //   {
      //     model: Treatments,
      //     order: [["createdAt", "DESC"]],
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      //   {
      //     model: Medicines_Treatments,
      //     order: [["createdAt", "DESC"]],
      //     attributes: {
      //       exclude: ["createdAt", "updatedAt"],
      //     },
      //   },
      // ],
    });
  }

  static async deleteSchedule(id) {
    return Schedules.destroy({ where: { id } });
  }
}

module.exports = SchedulesService;
