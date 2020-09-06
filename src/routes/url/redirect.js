const { Router } = require('express');
const controller = require('../../controllers/url');
const middlewares = require('../../middlewares/common');
const urlValidationSchema = require('../../models/urls/validationSchema');

const router = Router();

/**
 * Route to handle redirection of the short url to original url
 * Jatin Seth
 */
router.get('/:id', middlewares.inputValidation(urlValidationSchema.id(), 'params'), controller.redirect);

module.exports = router;
