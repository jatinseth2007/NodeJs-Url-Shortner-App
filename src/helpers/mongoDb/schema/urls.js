const mongoose = require('mongoose');
const cs = require('./common');

const { Schema } = mongoose;
const schemaObj = {
    url: {
        type: String,
        required: true,
    },
    description: String,
    ...cs.createUpdatedColumns(),
};

const urlSchema = new Schema(schemaObj);

module.exports = mongoose.model('Urls', urlSchema);
