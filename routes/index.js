// eslint-disable-next-line security/detect-non-literal-require

module.exports = function(app) {
    [
        '/admin',
        '/accounts',
        '/auth'
    ].forEach(route => app.use(route, require(`.${route}`)))
}