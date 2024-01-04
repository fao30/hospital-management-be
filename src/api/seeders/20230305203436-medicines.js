"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Medicines_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Medicines", [
      {
        id: 1,
        hospital_id: 1,
        name: "Paracetamol",
        article_number: "XII-II-XII-2023",
        price: 10000,
        in_stock: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        hospital_id: 1,
        name: "Panadol",
        article_number: "XII-II-XII-2022",
        price: 10000,
        in_stock: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Medicines", null, {});
  },
};
