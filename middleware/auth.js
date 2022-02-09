const jwt = require('jsonwebtoken');
const Account = require('../models').account;


module.exports = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const account = await Account.findOne({ where: { id: decodedToken.id }});
        if (!account) {
            throw new Error();
        } else {
            req.token = token;
            req.account = account.toJSON();
            next();
        }
    } catch {
        console.log('here error');
        res.status(401).send({error: 'Not authorized'});
    }
};