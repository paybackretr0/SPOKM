("use strict");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      nim: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: "Mahasiswas",
          key: "nim",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      refresh_token: {
        type: Sequelize.TEXT,
      },
      role: {
        allowNull: false,
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
    await queryInterface.dropTable("Users");
  },
};
