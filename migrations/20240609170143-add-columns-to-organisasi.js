'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Organisasis', 'lingkupOrganisasi', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Organisasis', 'namaKetua', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Organisasis', 'nimKetua', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Organisasis', 'no_wa', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Organisasis', 'departemen', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Organisasis', 'profilOrg', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('Organisasis', 'suratRek', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
