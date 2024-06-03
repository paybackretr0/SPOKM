"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Organisasis", {
      idOrga: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "userId",
        },
      },
      namaOrga: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deskripsi: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      tanggalPengajuan: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.CHAR,
      },
      tanggalBerdiri: {
        type: Sequelize.DATE,
      },
      logo: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Organisasis");
  },
};
