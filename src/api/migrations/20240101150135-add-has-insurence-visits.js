"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Users", "has_insurance");
    await queryInterface.addColumn("Visits", "has_insurance", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "has_insurance", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    });
    await queryInterface.removeColumn("Visits", "has_insurance");
  },
};
