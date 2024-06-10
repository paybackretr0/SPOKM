"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kegiatan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kegiatan.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Kegiatan.init(
    {
      idKegiatan: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      namaKegiatan: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      deskripsi: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      tanggalMulai: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      tanggalSelesai: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      tanggalPengajuan: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.CHAR,
      },
      penyelenggara: {
        type: DataTypes.CHAR,
      },
      bidangKegiatan: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lingkupKegiatan: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      proposal: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      logo: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      nimKetupel: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      laporanKegiatan: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Kegiatan",
    }
  );
  return Kegiatan;
};
