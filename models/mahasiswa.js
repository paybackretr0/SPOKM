"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mahasiswa.hasOne(models.User, { foreignKey: "nim" });
    }
  }
  Mahasiswa.init(
    {
      nim: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      nama: {
        type: DataTypes.STRING,
      },
      jurusan: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Mahasiswa",
    }
  );
  return Mahasiswa;
};
