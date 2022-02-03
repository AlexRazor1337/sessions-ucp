const accountRouter = require('express').Router();
const Account = require('../models').account;


accountRouter.get('/', async (req, res) => {
    res.send(await Account.findAll());
});


module.exports = accountRouter;