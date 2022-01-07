module.exports = function(app) {
    app.use('/admin', require('./admin'))
}