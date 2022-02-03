'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('accounts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            username: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(32)
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING(60)
            },
            serial: {
                allowNull: true,
                type: Sequelize.STRING(32),
                defaultValue: null
            },
            email: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(32)
            },
            status: {
                allowNull: false,
                type: Sequelize.ENUM(['user', 'advicer', 'moderator', 'admin', 'superadmin']),
                defaultValue: 'user'
            },
            autologin: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()')
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('accounts')
    }
}