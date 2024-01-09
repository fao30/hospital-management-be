const { SUPER_ADMIN } = require("../constants/roles.const");
const {
  Treatments,
  Medicines_Treatments,
  Visits,
  Sequelize,
  Schedules,
  Users,
} = require("../models");
const { startOfDay, endOfDay } = require("date-fns");
const { Op } = require("sequelize");

class SchedulesService {
  static async createSchedule(query) {
    return Schedules.create(query);
  }

  static async findAllSchedules(limit, page, req = null) {
    const { hospital_id = 0, role_id } = req?.headers;
    const sort_created_at = req?.query?.sort_created_at;
    const sort_doctor_id = req?.query?.sort_doctor_id;
    const date_time = req?.query?.date_time || null;
    const filter_by_date = JSON.parse(req.query.filter_by_date || false);

    const order = [];

    let where = {};

    if (role_id !== SUPER_ADMIN) {
      where.hospital_id = hospital_id;
    }

    if (filter_by_date) {
      const startDate = startOfDay(new Date(date_time));
      const endDate = endOfDay(new Date(date_time));

      where.date_time = {
        [Op.between]: [startDate, endDate],
      };
    }

    if (sort_created_at) {
      order.push(["createdAt", sort_created_at]);
    }
    if (sort_doctor_id) {
      order.push(["doctor_id", sort_doctor_id]);
      order.push(["date_time", "ASC"]);
    }

    return Schedules.findAndCountAll({
      where,
      limit,
      offset: limit * page,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order,
      include: [
        {
          model: Users,
          as: "patient",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Users,
          as: "admin",
          attributes: ["id", "first_name", "last_name"],
        },
        {
          model: Users,
          as: "doctor",
          attributes: ["id", "first_name", "last_name"],
        },
      ],
    });
  }

  static async findScheduleById(id) {
    return Schedules.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Users,
          as: "patient",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Users,
          as: "admin",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        {
          model: Users,
          as: "doctor",
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      ],
    });
  }

  static async deleteSchedule(id) {
    return Schedules.destroy({ where: { id } });
  }
}

module.exports = SchedulesService;
