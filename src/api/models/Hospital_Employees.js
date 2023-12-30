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
      medicine_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Medicines",
          },
          key: "id",
        },
      },
      medicines_treatment: {
        type: DataTypes.TEXT,
      },
      amount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      visit_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Visits",
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
