'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Character.belongsTo(models.account, {foreignKey: 'accountId', targetKey: 'id'})
        }
    }
    Character.init({
        name: DataTypes.STRING,
        health: DataTypes.INTEGER,
        position: DataTypes.STRING,
        skin: DataTypes.INTEGER,
        description: DataTypes.STRING,
        lifes: DataTypes.INTEGER,
        sex: DataTypes.ENUM(['male', 'female']),
        state: DataTypes.INTEGER,
        accountId: DataTypes.INTEGER,
        timer: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'character',
    })

    return Character
}