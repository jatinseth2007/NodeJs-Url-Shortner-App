/* eslint-disable no-underscore-dangle */
/* eslint-disable no-throw-literal */
/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/users/index');

class UsersController {
    /**
     * Function to create new URL shortner
     * Jatin Seth
     */
    async create(req, res, next) {
        try {
            // initiate new user...
            const user = new UsersModel(req.body);
            // going to save the data...
            const output = await user.create();
            res.json({
                message: 'User has been created successfully',
                id: output._id,
            });
        } catch (error) {
            next(error);
        }
    }// EOF

    /**
     * Function to authenticate user into our system
     * Jatin Seth
     */
    async login(req, res, next) {
        try {
            // initiate the user object...
            const userObj = new UsersModel({});
            // fetch User by email...
            await userObj.fetchUserByEmail(req.body);
            // if user does not exist...
            if (!userObj.id)
                throw {
                    message: 'This email does not exist in our system, please sign up.',
                };
            // login user...
            const isPaswordMatched = await userObj.isPasswordMatched(req.body.password);
            if (!isPaswordMatched)
                throw {
                    message: 'Login failed, password is incorrect.',
                };
            // everything is perfect, let's create a valid tokens for user...
            const payload = {
                id: userObj.id,
                name: userObj.name,
                email: userObj.email,
                createdAt: userObj.createdAt,
                updatedAt: userObj.updatedAt,
            };
            const token = userObj.generateJwtToken(payload);
            const refreshToken = userObj.generateJwtRefreshToken(payload);
            // response
            res.json({
                message: 'Logged in successfully',
                token,
                refreshToken,
                ...payload,
            });
        } catch (error) {
            next(error);
        }
    }

    /**
     * Function to generate new token from refresh token
     * Jatin Seth
     */
    async refreshToken(req, res, next) {
        try {
            // let's validate the refresh token...
            const tokenPayload = jwt.verify(req.body.refreshToken, process.env.APP_JWT_REFRESH_SECRET);
            // need to check if user is valid user inside the system...
            const userObj = new UsersModel({});
            // fetch User by email...
            await userObj.fetchUserById(tokenPayload.id);
            // if user does not exist...
            if (!userObj.id) {
                throw {
                    message: 'User not found in our system.',
                };
            }// EOI
            // everything is perfect, let's create a valid tokens for user...
            const payload = {
                id: userObj.id,
                name: userObj.name,
                email: userObj.email,
                createdAt: userObj.createdAt,
                updatedAt: userObj.updatedAt,
            };
            // refresh the token with new payload...
            const token = userObj.generateJwtToken(payload);
            res.json({
                message: 'Token refreshed successfully',
                token,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UsersController();
