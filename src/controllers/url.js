/* eslint-disable class-methods-use-this */
const urlModel = require('../models/urls/index');
const urlValidationSchema = require('../models/urls/validationSchema');

class Url {
    /**
     * Function to create new URL shortner
     * Jatin Seth
     */
    async create(req, res, next) {
        try {
            // validate the data first...
            const validation = await urlValidationSchema.createNew().validateAsync(req.body);
            // check if validation is failed
            if ('error' in validation) {
                throw validation.error;
            }// EOI

            // see if we already have the url saved with us...
            const url = await urlModel.findByUrl(req.body);
            // if url already exist then just send it back...
            let output;
            if (url && '_id' in url) {
                output = url;
            } else {
                // going to save the data...
                output = await urlModel.create(req.body);
            }

            // sending the ID back...
            return res.json({
                message: 'Url saved successfully.',
                _id: output?._id,
            });
        } catch (error) {
            next(error);
        }
    }// EOF

    /**
     * Function to fetch url shortner by ID
     * Jatin Seth
     */
    async fetchById(req, res, next) {
        try {
            // fetch the data by id...
            const url = await urlModel.findById(req.params.id);
            // if not found then error...
            if (!url) {
                res.status(404);
                throw {
                    message: 'Url data not found',
                };
            }// EOI

            return res.json(url);
        } catch (error) {
            next(error);
        }
    }

    /**
     * Function to delete an entry by ID
     * Jatin Seth
     */
    async deleteById(req, res, next) {
        try {
            // delete the document by ID...
            await urlModel.deleteById(req.params.id);
            // response back...
            return res.json({
                message: 'Url has been deleted successfully',
                _id: req.params.id,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new Url();
