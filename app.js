require('dotenv').config()

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')

AdminJS.registerAdapter(AdminJSSequelize)

const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const db = require('./models')

const adminJs = new AdminJS({
    databases: [db],
    rootPath: '/admin',
})

const router = AdminJSExpress.buildRouter(adminJs)
app.use(adminJs.options.rootPath, router)
app.listen(port, () => {})