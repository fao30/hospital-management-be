"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Visits_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Visits", [
      {
        id: 1,
        patient_id: 5,
        payment_status_id: 3,
        hospital_id: 1,
        date_start: new Date(),
        weight: 80,
        height: 180,
        temperature: 37.5,
        blood_presure: 180,
        diagnosis: "Flu",
        is_patient_discharged: false,
        case_notes: "Flu with temperature",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Visits", null, {});
  },
};
