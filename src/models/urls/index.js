/* eslint-disable no-useless-catch */
/* eslint-disable class-methods-use-this */
const urlSchema = require('../../helpers/mongoDb/schema/urls');

class UrlModel {
    /**
     * Function to create new url entry...
     * Jatin Seth
     */
    async create(input) {
        try {
            // let's create a new entry...
            const output = await urlSchema.create(input);
            return output;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function to find the row(s) by url
     * Jatin Seth
     */
    async findByUrl({ url }) {
        try {
            return await urlSchema.findOne({ url });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function to find the row(s) by id
     * Jatin Seth
     */
    async findById(id) {
        try {
            return await urlSchema.findOne({ _id: id });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function to delete an entry by ID
     * Jatin Seth
     */
    async deleteById(id) {
        try {
            // delete the document by ID...
            return await urlSchema.deleteOne({ _id: id });
        } catch (error) {
            throw error;
        }
    }
}// EOC

module.exports = new UrlModel();
