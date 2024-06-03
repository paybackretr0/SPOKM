"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.Berita, {
        foreignKey: "userId",
      });
    }
  }
  user.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nama: DataTypes.STRING,
      nim: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      refresh_token: DataTypes.TEXT,
      jurusan: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
