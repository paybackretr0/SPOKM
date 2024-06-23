"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    static associate(models) {
      Notifikasi.belongsTo(models.User, {
        foreignKey: "pengirim",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Notifikasi.init(
    {
      idNotif: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      judul: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      tanggal: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.CHAR,
      },
      isi: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      pengirim: {
        type: DataTypes.STRING,
      },
      penerima: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Notifikasi",
    }
  );
  return Notifikasi;
};
