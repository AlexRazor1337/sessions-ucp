const jwt = require('jsonwebtoken');
const Account = require('../models').account;
const invalidatedTokens = require('../models').invalidatedTokens;


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const invalidatedToken = await invalidatedTokens.findOne({ where: { token } });
        if (invalidatedToken) throw new Error();

        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const account = await Account.findOne({ where: { id: decodedToken.id } });
        if (!account) {
            throw new Error();
        } else {
            req.token = token;
            req.account = account.toJSON();
            next();
        }
    } catch {
        res.status(401).send({ error: 'Not authorized' });
    }
};