"use strict";

const { sequelize } = require("../models");

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
        type: Sequelize.STRING,
        references: {
          model: "Kategoris",
          key: "idKategori",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
        type: Sequelize.STRING,
        references: {
          model: "Users",
          key: "userId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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
