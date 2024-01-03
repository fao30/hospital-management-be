"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Users_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Users", [
      {
        id: 1,
        first_name: "super-admin",
        last_name: "admin-super",
        id_number: "123323",
        date_of_birth: "10-10-2023",
        email: "test@test.com",
        password: await bcrypt.hash("123321", 10),
        phone_number: "6287762626262",
        country_id: 1,
        role_id: 1,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        first_name: "Manager Hospital",
        last_name: "Managerov",
        id_number: "123323",
        date_of_birth: "10-10-2023",
        email: "managerhospital@test.com",
        password: await bcrypt.hash("123321", 10),
        phone_number: "6287762626263",
        country_id: 1,
        role_id: 2,
        hospital_id: 1,
        is_active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
