/* eslint-disable security/detect-non-literal-require */

module.exports = function(app) {
    [
        '/auth',
        '/admin',
        '/accounts',
        '/characters'
    ].forEach(route => app.use(route, require(`.${route}`)));
};