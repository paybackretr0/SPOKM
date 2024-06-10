"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Himpunan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Himpunan.belongsTo(models.Organisasi, {
        foreignKey: "idOrga",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Himpunan.belongsTo(models.Anggota, {
        foreignKey: "idPengurus",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Himpunan.init(
    {
      idOrga: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      idPengurus: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Himpunan",
    }
  );
  return Himpunan;
};
