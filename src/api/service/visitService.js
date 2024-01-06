const { SUPER_ADMIN } = require("../constants/roles.const");
const {
  Treatments,
  Medicines_Treatments,
  Visits,
  Sequelize,
} = require("../models");

class VisitsService {
  static async createVisit(query) {
    return Visits.create(query);
  }

  static async findAllVisits(limit, page, req = null) {
    const { hospital_id, role_id } = req.headers;
    const created_at = req?.query.created_at;

    let order = [["createdAt", "ASC"]];

    let where = {};

    if (role_id !== SUPER_ADMIN) {
      where.hospital_id = hospital_id;
    }

    if (created_at) {
      order = [["createdAt", created_at]];
    }

    return Visits.findAndCountAll({
      where,
      limit,
      offset: limit * page,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order,
      include: [
        {
          model: Treatments,
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Medicines_Treatments,
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
  }

  static async findVisitById(id) {
    return Visits.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: Treatments,
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Medicines_Treatments,
          order: [["createdAt", "DESC"]],
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });
  }

  static async deleteVisit(id) {
    return Visits.destroy({ where: { id } });
  }
}

module.exports = VisitsService;
