"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Himpunans", {
      idOrga: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Organisasis",
          key: "idOrga",
        },
      },
      idPengurus: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Anggotas",
          key: "idPengurus",
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
    await queryInterface.dropTable("Himpunans");
  },
};
