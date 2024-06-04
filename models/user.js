"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Berita, {
        foreignKey: "userId",
      });
      User.hasMany(models.Organisasi, {
        foreignKey: "userId",
      });
      User.hasMany(models.Kegiatan, {
        foreignKey: "userId",
      });
      User.hasMany(models.Notifikasi, {
        foreignKey: "userId",
      });
      User.belongsTo(models.Mahasiswa, { foreignKey: "nim" });
    }
  }
  User.init(
    {
      userId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      nim: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      refresh_token: {
        type: DataTypes.TEXT,
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
