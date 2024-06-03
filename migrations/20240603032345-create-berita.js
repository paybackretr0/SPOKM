"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("beritas", {
      idNews: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      kategori: {
        allowNull: false,
        type: Sequelize.STRING,
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
        type: Sequelize.INTEGER,
        references: {
          model: "users",
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
    await queryInterface.dropTable("beritas");
  },
};
