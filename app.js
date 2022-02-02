require('dotenv').config()

const express = require('express')
const app = express()
app.use(express.json())
app.use(require('compression')())

const port = process.env.PORT || 3000

require('./routes')(app)

app.listen(port, () => {
    if (process.env.NODE_ENV === 'production') console.log('App started at port ' + port)
})