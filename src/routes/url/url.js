const { Router } = require('express');
const controller = require('../../controllers/url');

const router = Router();

/**
 * Route to handle the create new url shortner
 * Jatin Seth
 */
router.post('/', controller.create);

/**
 * Route to handle fetch url shortner by id
 * Jatin Seth
 */
router.get('/:id', controller.fetchById);

/**
 * Route to handle delete url shortner by id
 * Jatin Seth
 */
router.delete('/:id', controller.deleteById);

module.exports = router;
