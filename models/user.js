const Sequelize = require("sequelize");
const conn = require("../src/koneksi");

const { DataTypes } = Sequelize;

const users = conn.define(
  "user",
  {
    nama: {
      type: DataTypes.STRING,
    },
    nim: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.TEXT,
    },
    jurusan: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = users;
