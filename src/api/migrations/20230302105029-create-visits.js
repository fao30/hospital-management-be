"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Visits", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Roles",
          },
          key: "id",
        },
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Payment_Statuses",
          },
          key: "id",
        },
      },
      hospital_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Hospitals",
          },
          key: "id",
        },
      },
      due_amount: {
        type: Sequelize.INTEGER,
      },
      paid_amount: {
        type: Sequelize.INTEGER,
      },
      date_start: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      date_end: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      weight: {
        type: Sequelize.DECIMAL,
      },
      height: {
        type: Sequelize.DECIMAL,
      },
      temperature: {
        type: Sequelize.DECIMAL,
      },
      blood_presure: {
        type: Sequelize.DECIMAL,
      },
      diagnosis: {
        type: Sequelize.TEXT,
      },
      case_notes: {
        type: Sequelize.TEXT,
      },
      gender: {
        type: Sequelize.ENUM({
          values: ["MALE", "FEMALE"],
        }),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Visits");
  },
};
