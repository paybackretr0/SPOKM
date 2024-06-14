"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Komentar extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Komentar.belongsTo(models.User, {
        foreignKey: "userId",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Komentar.belongsTo(models.Berita, {
        foreignKey: "idNews",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Komentar.init(
    {
      idKomentar: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      idNews: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
      },
      komentar: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      tanggal: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Komentar",
    }
  );
  return Komentar;
};
