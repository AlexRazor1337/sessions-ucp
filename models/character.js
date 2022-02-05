'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate(models) {
            Character.belongsTo(models.account, {foreignKey: 'accountId', targetKey: 'id'});
        }
    }
    Character.init({
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [4, 32]
            }
        },
        health: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
            }
        },
        position: DataTypes.STRING,
        skin: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 350
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: true,
                len: [1, 256]
            }
        },
        lifes: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            }
        },
        sex: DataTypes.ENUM(['male', 'female']),
        state: DataTypes.ENUM(['normal', 'laying']),
        accountId: DataTypes.INTEGER,
        timer: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
            }
        }
    }, {
        sequelize,
        updatedAt: false,
        modelName: 'character'
    });

    return Character;
};