
const AdminJS = require('adminjs')
const db = require('../models')

const adminJs = new AdminJS({
    rootPath: '/admin',
    databases: [db],
    resources: [
        {
            resource: db.account,
            options: {
                properties: {
                    username: {
                        position: 1,
                        isTitle: true,
                        isRequired: true
                    },
                    email: {
                        position: 2,
                        isRequired: true
                    },
                    password: {
                        position: 3,
                        isRequired: true,
                        type: 'password'
                    },

                    autologin: {
                        isVisible: { list: true, filter: false, show: true, edit: false },
                    }
                },
            }
        },
        {
            resource: db.character,
            options: {
                properties: {
                    name: {
                        position: 1,
                        isRequired: true
                    },
                    accountId: {
                        position: 2,
                        isRequired: true
                    },
                    sex: {
                        position: 3,
                    },
                    skin:{
                        position: 4,
                    },
                    position: {
                        type: 'mixed',
                        isVisible: { list: false, filter: false, show: true, edit: false },
                    },
                    description: {
                        type: 'textarea'
                    }
                },
            }
        }
    ],
})

module.exports = adminJs