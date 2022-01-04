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
                type: Sequelize.STRING(72)
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
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        })
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('accounts')
    }
}