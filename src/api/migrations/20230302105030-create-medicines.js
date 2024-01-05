"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Medicines", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      hospital_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: {
            tableName: "Hospitals",
          },
          key: "id",
        },
      },
      article_number: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      currency: {
        type: Sequelize.STRING,
        defaultValue: "RP",
      },
      price: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      in_stock: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      manufacturer: {
        type: Sequelize.STRING,
        defaultValue: "-",
      },
      expiry_date: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Medicines");
  },
};
