"use strict";
const { Model } = require("sequelize");
const { hashPassword, comparePassword } = require("../Helpers/Bycript");

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
      Users.hasMany(models.Alergies_Users, { foreignKey: "user_id" });
      Users.hasMany(models.Hospital_Employees, {
        foreignKey: "user_id",
      });
      Users.hasMany(models.Treatments, {
        foreignKey: "doctor_id",
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
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: {
            tableName: "Roles",
          },
          key: "id",
        },
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      hooks: {
        beforeCreate: (user) => {
          if (user.password) {
            user.password = hashPassword(user.password);
          }
        },
        beforeUpdate: (user) => {
          if (user.password) {
            user.password = hashPassword(user.password);
          }
        },
      },
    }
  );

  Users.prototype.checkPassword = function (password) {
    return comparePassword(password, this.password);
  };

  return Users;
};
