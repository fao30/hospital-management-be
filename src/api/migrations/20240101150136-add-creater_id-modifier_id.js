"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Schedules", "creator_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("Schedules", "modifier_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("Visits", "creator_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("Visits", "modifier_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("Treatments", "creator_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("Treatments", "modifier_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: {
          tableName: "Users",
        },
        key: "id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Schedules", "creator_id");
    await queryInterface.removeColumn("Schedules", "modifier_id");
    await queryInterface.removeColumn("Visits", "creator_id");
    await queryInterface.removeColumn("Visits", "modifier_id");
    await queryInterface.removeColumn("Treatments", "creator_id");
    await queryInterface.removeColumn("Treatments", "modifier_id");
  },
};
