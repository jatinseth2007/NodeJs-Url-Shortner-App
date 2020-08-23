const mongoose = require('mongoose');
const cs = require('./common');

const { Schema } = mongoose;
const schemaObj = {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    ...cs.createUpdatedColumns(),
};

const usersSchema = new Schema(schemaObj);

module.exports = mongoose.model('Users', usersSchema);
