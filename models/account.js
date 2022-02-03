'use strict'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
                len: [6]
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
        autologin: DataTypes.BOOLEAN,
    }, {
        sequelize,
        updatedAt: false,
        modelName: 'account',
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
        scopes: {
            full: {
                attributes: {}
            },
        }
    })

    Account.beforeCreate((user, options) => {
        return bcrypt.hash(user.password, 10)
            .then(hash => {
                console.log(hash)
                user.password = hash
            })
            .catch(err => {
                throw new Error()
            })
    })

    Account.prototype.validPassword = async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    Account.prototype.generateAccessToken = function () {
        const { id, username } = this;
        return jwt.sign({ id, username }, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION_TIME })
    }

    return Account
}