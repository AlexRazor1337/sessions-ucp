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
        username: {
            type: DataTypes.STRING,
            validate: {
                len: [6, 32]
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: [6, 32]
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        serial: {
            type: DataTypes.STRING
        },
        status: DataTypes.ENUM(['user', 'advicer', 'moderator', 'admin', 'superadmin']),
        autologin: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'account'
    })
    return Account
}