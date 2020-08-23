const Joi = require('@hapi/joi');

class UrlValidations {
    /**
     * Function to return the schema to create new url
     * Jatin Seth
     */
    createNew() {
        try {
            return Joi.object({
                url: Joi.string().uri().required(),
                description: Joi.string(),
            });
        } catch (error) {
            throw error;
        }
    }
}// EOC

module.exports = new UrlValidations();
