"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "mahasiswas",
      [
        {
          nim: "2211523030",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nim: "1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nim: "123",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nim: "2211523010",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nim: "2211522032",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("mahasiswas", null, {});
  },
};
