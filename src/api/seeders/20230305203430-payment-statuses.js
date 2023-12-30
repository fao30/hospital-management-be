"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Payment_Statuses_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Payment_Statuses", [
      {
        id: 1,
        name: "full_paid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "partially_paid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "unpaid",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Payment_Statuses", null, {});
  },
};
