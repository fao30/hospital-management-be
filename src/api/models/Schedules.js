"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HERE define association here

      Schedules.belongsTo(models.Users, {
        foreignKey: "patient_id",
        as: "patient",
      });
      Schedules.belongsTo(models.Users, {
        foreignKey: "doctor_id",
        as: "doctor",
      });
      Schedules.belongsTo(models.Users, {
        foreignKey: "admin_id",
        as: "admin",
      });
    }
  }
  Schedules.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      is_admin_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_doctor_approved: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      date_time: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      status: {
        type: DataTypes.ENUM,
        values: ["SCHEDULED", "NOT_SHOW", "DONE", "CANCELLED"],
      },
    },
    {
      sequelize,
      modelName: "Schedules",
    }
  );
  return Schedules;
};
