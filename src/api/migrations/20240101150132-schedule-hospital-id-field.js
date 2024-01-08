"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Schedules", "hospital_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "Hospitals",
        },
        key: "id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Schedules", "hospital_id");
  },
};
