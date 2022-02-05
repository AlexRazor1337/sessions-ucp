const charactersRouter = require('express').Router();
const Account = require('../models').account;
const Character = require('../models').character;
const authMiddleware = require('../middleware/auth');

charactersRouter.get('/', authMiddleware, async (req, res) => {
    const accountId = req.account.id;
    const characters = await Character.findAll({ where: { accountId } });

    res.send(characters);
});


charactersRouter.post('/', authMiddleware, async (req, res) => {
    const accountId = req.account.id;
    const charactersCount = await Character.count({ where: { accountId } });
    if (charactersCount === 4) {
        return res.status(400).send('You can\t create more characters!');
    }
    // name, skin, description, sex, accountId
    const {name, skin, description, sex} = req.body;
    const character = await Character.create({name, skin, description, sex, accountId});
    res.send(character);
});


module.exports = charactersRouter;