"use strict";
const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class Berita extends Model {
    static associate(models) {
      Berita.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Berita.belongsTo(models.Kategori, {
        foreignKey: "idKategori",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Berita.hasMany(models.Komentar, {
        foreignKey: "idNews",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Berita.init(
    {
      idNews: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      judul: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      idKategori: {
        allowNull: false,
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
      modelName: "Berita",
      tableName: "beritas",
    }
  );

  return Berita;
};
