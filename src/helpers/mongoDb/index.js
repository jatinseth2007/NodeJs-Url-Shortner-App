/* eslint-disable max-len */
/* eslint-disable no-useless-catch */
const mongoose = require('mongoose');
const tracer = require('tracer').colorConsole();

class MongoDbConnection {
    constructor({ APP_DB_DATABASE_NAME: dbName, APP_DB_USERNAME_NAME: dbUser, APP_DB_DATABASE_PASSWORD: dbPass, APP_DB_HOST: dbHost, APP_DB_PORT: dbPort }) {
        this.host = dbHost;
        this.port = dbPort;
        this.db = dbName;
        this.user = dbUser;
        this.pass = dbPass;
    }// EOF

    /**
     * Function to connect to MongoDb
     * Jatin Seth
     */
    async connect() {
        try {
            await mongoose.connect(`mongodb://${this.host}:${this.port}/${this.db}`, {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                auth: { authSource: this.db },
                user: this.user,
                pass: this.pass,
            });
            tracer.log('Connected to MongoDb successfully');
        } catch (error) {
            tracer.error(error);
        }
    }
}

module.exports = MongoDbConnection;
