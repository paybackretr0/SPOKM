"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Organisasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Organisasi.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Organisasi.hasMany(models.Himpunan, {
        foreignKey: "idOrga",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
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
