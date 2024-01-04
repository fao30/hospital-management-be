"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Medicines_Treatments_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Medicines_Treatments", [
      {
        id: 1,
        medicine_id: 1,
        medicines_treatment: "Drink to decrease flu",
        quantity: 2,
        visit_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Medicines_Treatments", null, {});
  },
};
