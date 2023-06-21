const authRouter = require('express').Router();
const Account = require('../models').account;
const invalidatedTokens = require('../models').invalidatedTokens;
const authMiddleware = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const validationMiddleware = require('../middleware/validationMiddleware');
const accountRegistrationSchema = require('../validationSchemas/accountRegistration');
const loginSchema = require('../validationSchemas/login');

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50,
    standardHeaders: false,
    legacyHeaders: false,
});


authRouter.post('/signup',
    limiter,
    validationMiddleware(accountRegistrationSchema),
    async (req, res) => {
        const { username, password, email } = req.body;
        try {
            const account = await Account.create({ username, password, email });
            delete account.dataValues.password; // Because scopes don't work with create
            res.status(201).send(account);
        } catch (e) {
            res.status(400).send({ 'error': e.errors[0].message });
        }
    }
);

authRouter.post('/login',
    limiter,
    validationMiddleware(loginSchema),
    async (req, res) => {
        const { username, password } = req.body;
        try {
            const account = await Account.scope('full').findOne({ where: { username } });
            if (account && account.validPassword(password)) {
                account.dataValues.token = account.generateAccessToken();
                delete account.dataValues.password;
                return res.status(200).send(account);
            }
            return res.status(401).send();
        } catch (e) {
            console.log('error auth', e);
            return res.status(400).send();
        }
    }
);

authRouter.get('/profile', authMiddleware, (req, res) => {
    return res.status(200).send(req.account);
});

authRouter.get('/logout', authMiddleware, async (req, res) => {
    const token = req.token;
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    await invalidatedTokens.create({ token, expirationTime: decodedToken.exp });
    return res.send();
});

module.exports = authRouter;