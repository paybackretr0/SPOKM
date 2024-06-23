"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organisasi extends Model {
    static associate(models) {
      Organisasi.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Organisasi.hasMany(models.Anggota, {
        foreignKey: "idOrga",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      });
    }
  }
  Organisasi.init(
    {
      idOrga: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      namaOrga: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deskripsi: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      tanggalPengajuan: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      tanggalBerdiri: {
        type: DataTypes.DATE,
      },
      lingkupOrganisasi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      namaKetua: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nimKetua: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profilOrg: {
        type: DataTypes.STRING,
      },
      suratRek: {
        type: DataTypes.STRING,
      },
      logo: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Organisasi",
    }
  );
  return Organisasi;
};
