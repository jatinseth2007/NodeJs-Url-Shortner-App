const url = require('./url/url');
const users = require('./users/users');
const redirect = require('./url/redirect');

module.exports = (app) => {
    app.use('/', redirect);
    app.use('/v1/api/urls', url);
    app.use('/v1/api/users', users);
};
