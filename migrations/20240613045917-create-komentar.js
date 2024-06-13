"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Komentars", {
      idKomentar: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      idNews: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Beritas",
          key: "idNews",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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
      komentar: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      tanggal: {
        allowNull: false,
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Komentars");
  },
};
