"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Roles_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Roles", [
      {
        id: 1,
        name: "superadmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "hospital-manager",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "hospital-admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "doctor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "patient",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "pharmacist",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Roles", null, {});
  },
};
