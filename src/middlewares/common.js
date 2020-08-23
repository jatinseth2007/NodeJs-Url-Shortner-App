/* eslint-disable class-methods-use-this */
/* eslint-disable no-useless-catch */

class CommonMiddlewares {
    /**
     * Function to handle the not found routes
     * Jatin Seth
     */
    notFound(req, res, next) {
        try {
            const error = new Error(`Not Found - ${req.originalUrl}`);
            res.status(404);
            next(error);
        } catch (error) {
            throw error;
        }
    }// EOF

    /**
     * Funtion to handle errors
     * Jatin Seth
     */
    errorHandler(err, req, res, next) {
        try {
            const statusCode = (res.statusCode === 200) ? 500 : res.statusCode;
            res.status(statusCode);
            res.json({
                message: err.message,
                stack: process?.env?.APP_ENVIRONMENT === 'production' ? null : err.stack,
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function to handle input validations
     * Jatin Seth
     */
    inputValidation(schema, key) {
        return async (req, res, next) => {
            try {
                // validate the data first...
                const validation = await schema.validateAsync(req[key]);
                // check if validation is failed
                if ('error' in validation) {
                    throw validation.error;
                }// EOI
                // send next...
                next();
            } catch (error) {
                next(error);
            }
        };
    }// EOF
}// EOC

module.exports = new CommonMiddlewares();
