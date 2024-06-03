"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Beritas", {
      idNews: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      idKategori: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Kategoris",
          key: "idKategori",
        },
      },
      isi_berita: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      gambar: {
        type: Sequelize.STRING,
      },
      penulis: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tanggalPengajuan: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.CHAR,
        allowNull: false,
      },
      tanggalPublish: {
        type: Sequelize.DATE,
      },
      userId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "userId",
        },
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
    await queryInterface.dropTable("Beritas");
  },
};
