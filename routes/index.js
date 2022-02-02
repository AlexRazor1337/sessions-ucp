module.exports = function(app) {
    app.use('/admin', require('./admin'))
    app.use('/accounts', require('./accounts'))
}