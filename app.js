require('dotenv').config()

const bcrypt = require('bcrypt')
const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')
AdminJS.registerAdapter(AdminJSSequelize)
const db = require('./models')
const express = require('express')
const app = express()

const compression = require('compression')
app.use(compression())

const port = process.env.PORT || 3000

const adminJs = require('./routes/admin')
// const router = AdminJSExpress.buildRouter(adminJs)
const router = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await db.account.findOne({ email })
        if (user) {
            const matched = await bcrypt.compare(password, user.password)
            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
})
app.use(adminJs.options.rootPath, router)

app.listen(port, () => {})