require('dotenv').config()

const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const AdminJSSequelize = require('@adminjs/sequelize')
AdminJS.registerAdapter(AdminJSSequelize)

const express = require('express')
const app = express()


const port = process.env.PORT || 3000

const adminJs = require('./routes/admin')
const router = AdminJSExpress.buildRouter(adminJs)
app.use(adminJs.options.rootPath, router)

app.listen(port, () => {})