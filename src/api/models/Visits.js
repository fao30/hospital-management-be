"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visits extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HERE define association here
    }
  }
  Visits.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Roles",
          },
          key: "id",
        },
      },
      status_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Payment_Statuses",
          },
          key: "id",
        },
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
      due_amount: {
        type: DataTypes.INTEGER,
      },
      paid_amount: {
        type: DataTypes.INTEGER,
      },
      date_start: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      date_end: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      sequelize,
      modelName: "Visits",
    }
  );
  return Visits;
};