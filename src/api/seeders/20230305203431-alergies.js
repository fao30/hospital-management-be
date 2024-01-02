"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      'ALTER SEQUENCE "Alergies_id_seq" RESTART WITH 101'
    );

    await queryInterface.bulkInsert("Alergies", [
      {
        id: 1,
        name: "lactose",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "cow’s milk",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: "hen’s eggs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        name: "peanuts",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        name: "tree nuts",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
        name: "wheat",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 7,
        name: "soy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 8,
        name: "fish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 9,
        name: "shellfish",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10,
        name: "sesame",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 11,
        name: "Pollen Allergy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 12,
        name: "Mold Allergy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 13,
        name: "Pet Allergy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 14,
        name: "Cigarette smoke",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 15,
        name: "Cosmetics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 16,
        name: "Perfume",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 17,
        name: "Contact lenses",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 18,
        name: "Contact lens solution",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 19,
        name: "Pollen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 20,
        name: "Mold",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 21,
        name: "Dust mites",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 22,
        name: "Pet dander",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 23,
        name: "Cockroach & Mice Allergy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 24,
        name: "Antibiotics",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 25,
        name: "Aspirin and non-steroidal anti-inflammatory drugs (NSAIDs) like ibuprofen",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 26,
        name: "Drugs used in anesthesia",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 27,
        name: "Insulin (rarely)",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 28,
        name: "Chemotherapy drugs",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 29,
        name: "Yellow jackets",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 30,
        name: "Hornets",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 31,
        name: "Paper wasps",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 32,
        name: "Bees",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Alergies", null, {});
  },
};
