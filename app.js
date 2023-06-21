require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

if (process.env.BUILT_IN_GZIP)
    app.use(require('compression')());

const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'development') {
    const swaggerJSDoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    const swaggerDefinition = {
        openapi: '3.0.0',
        info: {
            title: 'Sessions UCP'
        },
        host: 'localhost:3000',
        basePath: '/'
    };

    const options = {
        swaggerDefinition,
        apis: ['./docs/swagger/**/*.yaml'],
    };

    const swaggerSpec = swaggerJSDoc(options);

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

require('./routes')(app);
require('./jobs')();

app.listen(port, () => {
    if (process.env.NODE_ENV === 'production') console.log('App started at port ' + port);
});