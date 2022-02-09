const charactersRouter = require('express').Router();
const Account = require('../models').account;
const Character = require('../models').character;
const authMiddleware = require('../middleware/auth');
const Validator = new (require('fastest-validator'));

const characterValidationSchema = {
    name: { type: 'string', min: 4, max: 32 },
    skin: { type: 'number', min: 1, max: 350, integer: true, optional: true },
    description: { type: 'string', min: 1, max: 256, optional: true },
    sex: { type: 'enum', values: ['male', 'female'] }
};
const check = Validator.compile(characterValidationSchema);

charactersRouter.get('/', authMiddleware, async (req, res) => {
    const accountId = req.account.id;
    const characters = await Character.findAll({ where: { accountId } });

    res.send(characters);
});


charactersRouter.post('/', authMiddleware, async (req, res) => {
    const validationResult = check(req.body);
    if (validationResult !== true) {
        return res.status(422).send(validationResult.map(error => error.message));
    }

    const accountId = req.account.id;
    const charactersCount = await Character.count({ where: { accountId } });
    if (charactersCount === 4) {
        return res.status(400).send('You can\t create more characters!');
    }

    const {name, skin, description, sex} = req.body;
    const character = await Character.create({name, skin, description, sex, accountId});
    res.send(character);
});


module.exports = charactersRouter;