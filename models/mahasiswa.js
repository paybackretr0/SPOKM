"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    static associate(models) {
      Mahasiswa.hasOne(models.User, {
        foreignKey: "nim",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Mahasiswa.init(
    {
      nim: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      nama: {
        type: DataTypes.STRING,
      },
      jurusan: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Mahasiswa",
    }
  );
  return Mahasiswa;
};
