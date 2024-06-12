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
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      namaOrga: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deskripsi: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      lingkupOrganisasi: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      namaKetua: {
        type: Sequelize.STRING,
      },
      nimKetua: {
        type: Sequelize.STRING,
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
      profilOrg: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      suratRek: {
        type: Sequelize.STRING,
        allowNull: false,
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
