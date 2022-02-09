const accountRouter = require('express').Router();
const Account = require('../models').account;
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validationMiddleware');
const accountUpdateSchema = require('../validationSchemas/accountUpdate');


accountRouter.get('/', async (req, res) => {
    res.send(await Account.findAll());
});


accountRouter.patch('/', authMiddleware,
    validationMiddleware(accountUpdateSchema),
    async (req, res) => {
        const { username, autologin } = req.body;
        await Account.update({ username, autologin }, { where: {id: req.account.id}});
        res.send();
    }
);


module.exports = accountRouter;