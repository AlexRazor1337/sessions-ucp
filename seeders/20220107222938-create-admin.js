'use strict'
require('dotenv').config()
const bcrypt = require('bcrypt')
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('accounts', [{
            username: process.env.ADMIN_LOGIN,
            email: process.env.ADMIN_MAIL,
            password: bcrypt.hashSync(process.env.ADMIN_PASS, 10),
            status: 'superadmin'
        }], {})
    },

    down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    }
}
