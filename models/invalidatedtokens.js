'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invalidatedTokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  invalidatedTokens.init({
    token: DataTypes.STRING,
    expirationTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invalidatedTokens',
    timestamps: false,
  });
  return invalidatedTokens;
};