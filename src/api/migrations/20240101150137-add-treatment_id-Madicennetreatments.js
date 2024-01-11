"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Medicines_Treatments", "treatment_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "Treatments",
        },
        key: "id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Medicines_Treatments", "treatment_id");
  },
};
