"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Medicines extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HERE define association here
      Medicines.hasMany(models.Medicines_Treatments, {
        foreignKey: "medicine_id",
      });
      Medicines.hasMany(models.Hospitals, {
        foreignKey: "hospital_id",
      });
    }
  }
  Medicines.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      hospital_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "Hospitals",
          },
          key: "id",
        },
      },
      article_number: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      currency: {
        type: DataTypes.STRING,
        defaultValue: "RP",
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      in_stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      manufacturer: {
        type: DataTypes.STRING,
        defaultValue: "-",
      },
      expiry_date: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Medicines",
    }
  );
  return Medicines;
};
