"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Hospital_Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HERE define association here
      // Users.belongsTo(models.Countries, { foreignKey: "country_id" });
      Hospital_Employees.belongsTo(models.Hospitals, {
        foreignKey: "hospital_id",
      });
      Hospital_Employees.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  Hospital_Employees.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hospital_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Hospitals",
          },
          key: "id",
        },
      },
      is_hospital_manager: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
      modelName: "Hospital_Employees",
    }
  );
  return Hospital_Employees;
};
