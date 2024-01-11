"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicines_Treatments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HERE define association here
      Medicines_Treatments.belongsTo(models.Medicines, {
        foreignKey: "medicine_id",
      });
      Medicines_Treatments.belongsTo(models.Visits, { foreignKey: "visit_id" });

      Medicines_Treatments.belongsTo(models.Treatments, {
        foreignKey: "treatment_id",
      });
    }
  }
  Medicines_Treatments.init(
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
      quantity: {
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
      treatment_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Treatments",
          },
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Medicines_Treatments",
    }
  );
  return Medicines_Treatments;
};
