/* eslint-disable class-methods-use-this */
const Joi = require('@hapi/joi');

class UsersValidations {
    /**
     * Function to return the schema to create new user
     * Jatin Seth
     */
    createNew() {
        try {
            return Joi.object({
                name: Joi.string().required().min(5).max(100),
                email: Joi.string().required().max(250).email(),
                password: Joi.string().required().min(6).max(50),
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function to return schema to validate login user
     * Jatin Seth
     */
    loginUser() {
        try {
            return Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function to return schema to refresh the token
     * Jatin Seth
     */
    refreshToken() {
        try {
            return Joi.object({
                refreshToken: Joi.string().required(),
            });
        } catch (error) {
            throw error;
        }
    }
}// EOC

module.exports = new UsersValidations();
