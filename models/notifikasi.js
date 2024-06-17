"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notifikasi.belongsTo(models.User, {
        foreignKey: "userId",
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
      userId: {
        allowNull: false,
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
