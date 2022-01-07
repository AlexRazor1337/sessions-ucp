require('dotenv').config()

const bcrypt = require('bcrypt')

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')
AdminJS.registerAdapter(AdminJSSequelize)

const express = require('express')
const app = express()

const adminJs = require('./routes/admin')
const db = require('./models')

const compression = require('compression')
app.use(compression())

const port = process.env.PORT || 3000

const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const allowedRoles = ['admin', 'superadmin']
        const user = await db.account.findOne({ email })
        if (user && allowedRoles.includes(user.status)) {
            const matched = await bcrypt.compare(password, user.password)
            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: process.env.SECRET,
})
app.use(adminJs.options.rootPath, router)

app.listen(port, () => {})