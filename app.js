require('dotenv').config()

const express = require('express')
const app = express()
app.use(require('compression')())

const port = process.env.PORT || 3000

require('./routes')(app)

app.listen(port, () => {})