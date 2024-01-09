"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // HERE define association here
      Users.belongsTo(models.Countries, { foreignKey: "country_id" });
      Users.belongsTo(models.Roles, { foreignKey: "role_id" });
      Users.hasMany(models.Treatments, { foreignKey: "doctor_id" });
      Users.hasMany(models.Visits, { foreignKey: "patient_id" });

      Users.hasMany(models.Schedules, {
        foreignKey: "patient_id",
      });
      Users.hasMany(models.Schedules, {
        foreignKey: "doctor_id",
      });
      Users.hasMany(models.Schedules, {
        foreignKey: "admin_id",
      });

      Users.belongsTo(models.Hospitals, {
        foreignKey: "hospital_id",
      });
    }
  }
  Users.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date_of_birth: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM,
        values: ["FEMALE", "MALE"],
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      country_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Countries",
          },
          key: "id",
        },
      },
      socket_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Roles",
          },
          key: "id",
        },
      },
      hospital_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Hospitals",
          },
          key: "id",
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      has_insurance: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_on_duty: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
