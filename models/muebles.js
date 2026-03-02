'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Muebles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Muebles.init({
    nombre: DataTypes.STRING,
    tipo: DataTypes.STRING,
    costo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Muebles',
  });
  return Muebles;
};