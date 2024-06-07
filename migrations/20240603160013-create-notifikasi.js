"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Notifikasis", {
      idNotif: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      judul: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      tanggal: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      status: {
        allowNull: false,
        type: Sequelize.CHAR,
      },
      isi: {
        allowNull: false,
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable("Notifikasis");
  },
};
