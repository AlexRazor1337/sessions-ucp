'use strict'
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('characters', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                unique: true,
                type: Sequelize.STRING(32)
            },
            health: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 100
            },
            position: {
                type: Sequelize.STRING(256)
            },
            skin: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 2
            },
            description: {
                type: Sequelize.STRING(256)
            },
            lifes: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 3
            },
            sex: {
                allowNull: false,
                type: Sequelize.ENUM(['male', 'female'])
            },
            state: {
                allowNull: false,
                type: Sequelize.ENUM(['normal', 'laying']),
                defaultValue: 'normal'
            },
            accountId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: { model: 'accounts', key: 'id' },
                onDelete: 'CASCADE'
            },
            timer: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('characters')
    }
}