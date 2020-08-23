/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-catch */
/* eslint-disable class-methods-use-this */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../../helpers/mongoDb/schema/users');

class UsersModel {
    constructor({ id = null, name = null, email = null, password = null, createdAt = null, updatedAt = null }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }// EOF

    /**
     * Function to create new user in the system
     * Jatin Seth
     */
    async create() {
        try {
            // generate hash password...
            this.password = await bcrypt.hash(this.password, 10);
            // let's create a new entry...
            const output = await userSchema.create({
                name: this.name,
                email: this.email,
                password: this.password,
            });
            return output;
        } catch (error) {
            throw error;
        }
    }// EOF

    /**
     * Function to match password provided by user to saved in the system
     * Jatin Seth
     */
    async isPasswordMatched(password) {
        try {
            // validate the password...
            return await bcrypt.compare(password, this.password);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function to fetch user by email ID
     * Jatin Seth
     */
    async fetchUserByEmail({ email }) {
        try {
            const user = await userSchema.findOne({ email });
            // assign user values to the object...
            this.id = user?._id;
            this.name = user?.name;
            this.email = user?.email;
            this.password = user?.password;
            this.createdAt = user?.createdAt;
            this.updatedAt = user?.updatedAt;
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Function to fetch user by ID
     * Jatin Seth
     */
    async fetchUserById(id) {
        try {
            const user = await userSchema.findOne({ _id: id });
            // assign user values to the object...
            this.id = user?._id;
            this.name = user?.name;
            this.email = user?.email;
            this.password = user?.password;
            this.createdAt = user?.createdAt;
            this.updatedAt = user?.updatedAt;
            return;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Genrate the JWT token
     * Jatin Seth
     */
    generateJwtToken(payload) {
        try {
            return jwt.sign(payload, process.env.APP_JWT_SECRET, { algorithm: 'HS256', expiresIn: '15m' });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Genrate the JWT refresh token
     * Jatin Seth
     */
    generateJwtRefreshToken(payload) {
        try {
            return jwt.sign(payload, process.env.APP_JWT_REFRESH_SECRET, { algorithm: 'HS256' });
        } catch (error) {
            throw error;
        }
    }
}// EOC

module.exports = UsersModel;
