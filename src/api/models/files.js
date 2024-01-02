"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Files extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Files.belongsTo(models.Visits, { foreignKey: "visit_id" });
    }
  }
  Files.init(
    {
      name: {
        type: DataTypes.STRING,
        visit_id: DataTypes.INTEGER,
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
      modelName: "Files",
    }
  );
  return Files;
};
