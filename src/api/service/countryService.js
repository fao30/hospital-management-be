const { Countries, Sequelize } = require("../models");

class Countrieservice {
  static async createCountry(name) {
    return Countries.create({ name });
  }

  static async findAllCountries() {
    return Countries.findAll({
      where: {
        id: { [Sequelize.Op.not]: 1 },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async findCountryById(id) {
    return Countries.findOne({
      where: { id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
  }

  static async deleteCountry(id) {
    return Countries.destroy({ where: { id } });
  }
}

module.exports = Countrieservice;
