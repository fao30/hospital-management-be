"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Hospital_Employees_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Hospital_Employees", [
      {
        id: 1,
        hospital_id: 1,
        user_id: 2,
        is_hospital_manager: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Hospital_Employees", null, {});
  },
};
