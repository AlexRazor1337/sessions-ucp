const charactersRouter = require('express').Router();
const Account = require('../models').account;
const Character = require('../models').character;
const authMiddleware = require('../middleware/auth');

charactersRouter.get('/', authMiddleware, async (req, res) => {
    const id = req.account.id;
    const characters = await Character.findAll({ where: { accountId: id } });

    res.send(characters);
});


module.exports = charactersRouter;