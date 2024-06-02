"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mahasiswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      mahasiswa.hasOne(models.user, { foreignKey: "nim" });
    }
  }
  mahasiswa.init(
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
      modelName: "mahasiswa",
    }
  );
  return mahasiswa;
};
