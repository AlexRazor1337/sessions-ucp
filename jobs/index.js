const cron = require('node-cron');
const clearInvalidatedTokens = require('./clearInvalidatedTokens');


module.exports = () => {
    cron.schedule('0 0 0 * * *', clearInvalidatedTokens);
};
