"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Hospitals_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Hospitals", [
      {
        id: 1,
        name: "RS AWAL BRO ABDUR",
        address: "JL. RANGKAS BITUNG TOKO MAINAN JAYA, NO.II",
        phone_number: "6287763748593",
        is_active: true,
        max_users: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Hospitals", null, {});
  },
};
