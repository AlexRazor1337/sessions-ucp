const bcrypt = require('bcrypt')
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')
AdminJS.registerAdapter(AdminJSSequelize)

const db = require('../models')

const adminJsConfig = new AdminJS({
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

const router = AdminJSExpress.buildAuthenticatedRouter(adminJsConfig, {
    authenticate: async (email, password) => {
        const allowedRoles = ['admin', 'superadmin']
        const user = await db.account.scope('full').findOne({ email })
        if (user && allowedRoles.includes(user.status)) {
            const matched = await bcrypt.compare(password, user.password)
            if (matched) return user
        }
        return false
    },
    cookiePassword: process.env.SECRET,
})

module.exports = router