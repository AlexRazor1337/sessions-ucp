const charactersRouter = require('express').Router();
const Character = require('../models').character;
const authMiddleware = require('../middleware/auth');
const validationMiddleware = require('../middleware/validationMiddleware');
const characterCreateSchema = require('../validationSchemas/characterCreation');


charactersRouter.get('/', authMiddleware, async (req, res) => {
    const accountId = req.account.id;
    const characters = await Character.findAll({ where: { accountId } });

    res.send(characters);
});


charactersRouter.post('/', authMiddleware,
    validationMiddleware(characterCreateSchema),
    async (req, res) => {
        const accountId = req.account.id;
        const charactersCount = await Character.count({ where: { accountId } });
        if (charactersCount === 4) {
            return res.status(400).send('You can\t create more characters!');
        }

        const {name, skin, description, sex} = req.body;
        const character = await Character.create({name, skin, description, sex, accountId});
        res.send(character);
    }
);

module.exports = charactersRouter;