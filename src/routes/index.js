const url = require('./url/url');
const users = require('./users/users');

module.exports = (app) => {
    app.use('/v1/api/urls', url);
    app.use('/v1/api/users', users);
};
