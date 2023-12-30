"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Treatments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HERE define association here
      Treatments.belongsTo(models.Users, { foreignKey: "doctor_id" });
      Treatments.belongsTo(models.Visits, { foreignKey: "visit_id" });
    }
  }
  Treatments.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
      },
      medical_treatment: {
        type: DataTypes.TEXT,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: "RP",
      },
      price: {
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
      modelName: "Treatments",
    }
  );
  return Treatments;
};
