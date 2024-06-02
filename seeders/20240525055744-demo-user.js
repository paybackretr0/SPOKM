const bcrypt = require("bcrypt");
("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { nanoid } = await import("nanoid");

    // Query the mahasiswa table to get the nims
    const mhs = await queryInterface.sequelize.query(
      `SELECT nim FROM mahasiswas;`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const roles = ["adminorg", "adminfti", "mhs"];

    // Map over the mahasiswas to create users
    const users = await Promise.all(
      mhs.map(async (mahasiswa, index) => ({
        userId: "U" + nanoid(7),
        nim: mahasiswa.nim,
        password: await bcrypt.hash("12345", 10),
        role: roles[index % roles.length],
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );

    // Bulk insert the users
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
