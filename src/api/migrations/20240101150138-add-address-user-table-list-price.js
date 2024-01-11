"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Users", "address", {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn("Medicines", "dose", {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true,
    });
    await queryInterface.addColumn("Medicines", "batch", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("Medicines", "cost", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
    await queryInterface.addColumn("Visits", "discount", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.createTable("List_Prices", {
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
      treatment_name: {
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
    await queryInterface.removeColumn("Users", "address");
    await queryInterface.removeColumn("Medicines", "batch");
    await queryInterface.removeColumn("Medicines", "dose");
    await queryInterface.removeColumn("Medicines", "cost");
    await queryInterface.removeColumn("Visits", "discount");
    await queryInterface.dropTable("Medicines");
  },
};
