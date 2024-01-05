"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Treatments_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Treatments", [
      {
        id: 1,
        doctor_id: 4,
        medical_treatment: "Xray scanning",
        price: 120000,
        visit_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        doctor_id: 4,
        medical_treatment: "Blood sample test",
        price: 150000,
        visit_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Treatments", null, {});
  },
};
