const invalidatedTokens = require('../models').invalidatedTokens;
const { Op } = require('sequelize');

const clearInvalidatedTokens = async () => {
    await invalidatedTokens.destroy({ where: { expirationTime: { [Op.lt]: Date.now() } } });
};

module.exports = clearInvalidatedTokens;