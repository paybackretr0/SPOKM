"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Berita extends Model {
    static associate(models) {
      // Hubungan antara berita dan user
      Berita.belongsTo(models.user, {
        foreignKey: "userId",
      });
    }
  }

  Berita.init(
    {
      // Definisi kolom tabel 'berita'
      idNews: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kategori: {
        type: DataTypes.STRING,
      },
      isi_berita: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      gambar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penulis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tanggalPengajuan: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      status: {
        type: DataTypes.CHAR,
        allowNull: false,
      },
      tanggalPublish: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Berita", // Nama model dengan huruf kapital
      tableName: "beritas", // Nama tabel di basis data
    }
  );

  return Berita;
};
