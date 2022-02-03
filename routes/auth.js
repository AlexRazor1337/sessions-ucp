const authRouter = require('express').Router()
const Account = require('../models').account
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

module.exports = authRouter