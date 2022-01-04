'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Account.hasMany(models.character)
        }
    }
    Account.init({
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        serial: DataTypes.STRING,
        email: DataTypes.STRING,
        status: DataTypes.INTEGER,
        autologin: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'account',
    })
    return Account
}