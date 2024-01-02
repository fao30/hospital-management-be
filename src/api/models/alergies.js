"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alergies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Alergies.hasMany(models.Alergies_Users, { foreignKey: "alergy_id" });
    }
  }
  Alergies.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Alergies",
    }
  );
  return Alergies;
};
