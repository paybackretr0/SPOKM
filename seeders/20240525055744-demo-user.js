const bcrypt = require("bcrypt");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          nim: "2211523030",
          password: await bcrypt.hash("12345", 10),
          role: "mhs",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nim: "1234",
          password: await bcrypt.hash("12345", 10),
          role: "adminorg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nim: "123",
          password: await bcrypt.hash("12345", 10),
          role: "adminfti",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
