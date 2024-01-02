"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Alergies_Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
      Alergies_Users.belongsTo(models.Alergies, {
        foreignKey: "alergy_id",
      });
      Alergies_Users.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  Alergies_Users.init(
    {
      alergy_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Alergies",
          },
          key: "id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Alergies_Users",
    }
  );
  return Alergies_Users;
};
