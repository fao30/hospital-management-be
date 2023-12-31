"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Medicines_Treatments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      medicine_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Medicines",
          },
          key: "id",
        },
      },
      medicines_treatment: {
        type: Sequelize.TEXT,
      },
      quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      visit_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Visits",
          },
          key: "id",
        },
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Medicines_Treatments");
  },
};
