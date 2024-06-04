"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Anggotas", {
      idPengurus: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nim: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      jabatan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      noHp: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      jenisKelamin: {
        allowNull: false,
        type: Sequelize.CHAR,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Anggotas");
  },
};
