const { Router } = require('express');
const controller = require('../../controllers/url');
const middlewares = require('../../middlewares/common');
const urlValidationSchema = require('../../models/urls/validationSchema');

const router = Router();

/**
 * Route to handle the create new url shortner
 * Jatin Seth
 */
router.post('/', middlewares.inputValidation(urlValidationSchema.createNew(), 'body'), controller.create);

/**
 * Route to handle fetch url shortner by id
 * Jatin Seth
 */
router.get('/:id', middlewares.inputValidation(urlValidationSchema.id(), 'params'), controller.fetchById);

/**
 * Route to handle delete url shortner by id
 * Jatin Seth
 */
router.delete('/:id', middlewares.inputValidation(urlValidationSchema.id(), 'params'), controller.deleteById);

module.exports = router;
