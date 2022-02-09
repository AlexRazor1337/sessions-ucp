const { BodyValidator } = require('fastest-express-validator');


const customErrorHandler = (err, req, res, next) => {
    res.status(422).send({ error: err.body.map(error => error.message) });
};


module.exports = (schema) => {
    return BodyValidator(schema, customErrorHandler);
};
