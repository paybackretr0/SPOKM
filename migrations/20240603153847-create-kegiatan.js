"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Kegiatans", {
      idKegiatan: {
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
      namaKegiatan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      deskripsi: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      tanggalMulai: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      tanggalSelesai: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      tanggalPengajuan: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.CHAR,
      },
      penyelenggara: {
        type: Sequelize.CHAR,
      },
      bidangKegiatan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lingkupKegiatan: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      proposal: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      logo: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      namaKetupel: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      nimKetupel: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      laporanKegiatan: {
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
    await queryInterface.dropTable("Kegiatans");
  },
};
