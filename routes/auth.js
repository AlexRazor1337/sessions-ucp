const authRouter = require('express').Router()
const Account = require('../models').account
const authMiddleware = require('../middleware/auth')
const { check, validationResult } = require('express-validator')


authRouter.post('/signup',
    check('username').isLength({ min: 6, max: 32 }),
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('password_confirmation').custom((value, { req }) => value === req.body.password),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, password, email } = req.body
        try {
            const account = await Account.create({ username, password, email })
            delete account.dataValues.password // Because scopes don't work with create
            res.status(201).send(account)
        } catch (e) {
            res.status(400).send({ 'error': e.errors[0].message })
        }
    }
)

authRouter.post('/login',
    check('username').isLength({ min: 6, max: 32 }),
    check('password').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        const { username, password } = req.body
        try {
            const account = await Account.scope('full').findOne({ where: { username }})
            if (account && account.validPassword(password)) {
                account.dataValues.token = account.generateAccessToken()
                delete account.dataValues.password
                return res.status(200).send(account)
            }
            return res.status(401).send()
        } catch (e) {
            console.log(e);
            return res.status(400).send()
        }
    }
)

authRouter.get('/profile', authMiddleware, (req, res) => {
    return res.status(200).send(req.account)
})

module.exports = authRouter