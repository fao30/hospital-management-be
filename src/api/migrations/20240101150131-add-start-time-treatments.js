"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Treatments", "start_time", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: new Date(),
    });
    await queryInterface.addColumn("Treatments", "end_time", {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: new Date(),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Treatments", "start_time");
    await queryInterface.removeColumn("Treatments", "end_time");
  },
};
