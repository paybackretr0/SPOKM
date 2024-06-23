"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Anggota extends Model {
    static associate(models) {
      Anggota.belongsTo(models.Organisasi, {
        foreignKey: "idOrga",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      });
    }
  }
  Anggota.init(
    {
      idPengurus: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      idOrga: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nama: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nim: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      jabatan: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      noHp: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      jenisKelamin: {
        allowNull: false,
        type: DataTypes.CHAR,
      },
    },
    {
      sequelize,
      modelName: "Anggota",
      tableName: "anggotas",
    }
  );
  return Anggota;
};
