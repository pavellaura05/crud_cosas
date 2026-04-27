'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Categorias extends Model {
    static associate(models) {
      // define association here
    }
  }

  Categorias.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Categorias',
    tableName: 'Categorias'
  });

  return Categorias;
};
