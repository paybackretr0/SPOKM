"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kategori extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Kategori.hasMany(models.Berita, {
        foreignKey: "idKategori",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Kategori.init(
    {
      idKategori: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      namaKategori: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Kategori",
    }
  );
  return Kategori;
};
