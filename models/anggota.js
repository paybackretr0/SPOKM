"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Anggota extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Anggota.hasMany(models.Himpunan, {
        foreignKey: "idPengurus",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
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
    }
  );
  return Anggota;
};
