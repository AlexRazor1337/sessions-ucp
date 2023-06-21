const { BodyValidator } = require('fastest-express-validator');


const customErrorHandler = (err, req, res, next) => {
    res.status(422).send({ error: err.body.map(error => error.message) });
};


module.exports = (schema) => { // TODO Remake without lib using only fastest-validator?
    return BodyValidator(schema, customErrorHandler);
};
