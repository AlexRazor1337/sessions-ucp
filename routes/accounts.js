const accountRouter = require('express').Router();
const Account = require('../models').account;
const authMiddleware = require('../middleware/auth');
const { check, validationResult } = require('express-validator');


accountRouter.get('/', async (req, res) => {
    res.send(await Account.findAll());
});


accountRouter.patch('/', authMiddleware,
    check('username').optional().isLength({ min: 6, max: 32 }),
    check('autologin').optional().isBoolean(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, autologin } = req.body;
        await Account.update({ username, autologin }, { where: {id: req.account.id}});
        res.send();
    }
);


module.exports = accountRouter;