"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Himpunans", {
      idOrga: {
        type: Sequelize.STRING,
        references: {
          model: "Organisasis",
          key: "idOrga",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      idPengurus: {
        type: Sequelize.STRING,
        references: {
          model: "Anggotas",
          key: "idPengurus",
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
    await queryInterface.dropTable("Himpunans");
  },
};

