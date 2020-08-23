const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const tracer = require('tracer').colorConsole();
const routes = require('./routes/index');
const middlewares = require('./middlewares/common');
const MongoHelper = require('./helpers/mongoDb/index');

require('dotenv').config(); // enviornment port

const app = express();
// body parser
app.use(express.json());
// adding helmet to express
app.use(helmet());
// adding morgan if not production
app.use(morgan('common'));

// connecting to database...
const mongoDb = new MongoHelper(process.env);
mongoDb.connect();

// adding routes
routes(app);

// adding middlewares...
app.use(middlewares.notFound); // not found one
app.use(middlewares.errorHandler); // error handler

// unhandeled exception
process.on('uncaughtException', (error, promise) => {
    tracer.error('We got uncaughtException at:', promise, 'reason:', error);
}).on('unhandledRejection', (error, promise) => {
    tracer.error('We got unhandledRejection at:', promise, 'reason:', error);
});

// calculating the port
const port = (process?.env?.APP_PORT) ? process.env.APP_PORT : 9001;

app.listen(port, () => {
    tracer.log(`Server is running on port ${port}`);
});
