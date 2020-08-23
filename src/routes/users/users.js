const { Router } = require('express');
const controller = require('../../controllers/users');
const middlewares = require('../../middlewares/common');
const userValidationSchema = require('../../models/users/validationSchema');

const router = Router();

/**
 * Route to handle the create new user in the system
 * Jatin Seth
 */
router.post('/signup', middlewares.inputValidation(userValidationSchema.createNew(), 'body'), controller.create);

/**
 * Route to authenticate user in our system
 * Jatin Seth
 */
router.post('/login', middlewares.inputValidation(userValidationSchema.loginUser(), 'body'), controller.login);

/**
 * Route to generate new token from refersh token
 * Jatin Seth
 */
router.post('/refreshtoken', middlewares.inputValidation(userValidationSchema.refreshToken(), 'body'), controller.refreshToken);

module.exports = router;
