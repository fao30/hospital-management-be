const { SUPER_ADMIN } = require("../constants/roles.const");
const { Medicines, List_Prices, Sequelize } = require("../models");

class ListPricesService {
  static async createListPrices(query) {
    return List_Prices.create(query);
  }

  static async findAllListPricess(limit, page, req = null) {
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

    return List_Prices.findAndCountAll({
      where,
      limit,
      offset: limit * page,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      order,
    });
  }

  static async findListPricesById(req, id) {
    const { role_id, hospital_id } = req?.headers;

    return List_Prices.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteListPrices(id) {
    return List_Prices.destroy({ where: { id } });
  }
}

module.exports = ListPricesService;
