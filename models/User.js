'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Generator = require('../components/Generator');
const UserStatuses = require('../constants/UserStatuses');
const UserRoles = require('../constants/UserRoles');
const ErrorMessages = require('../constants/ErrorMessages');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        salt: String,
        status: {
            type: Number,
            required: true,
            default: UserStatuses.WAITING
        },
        role: {
            type: Number,
            required: true,
            default: UserRoles.STANDARD
        },
        _hash: String
    },
    {
        timestamps: true
    }
);

UserSchema.pre('save', async function() {
    if (this.isNew || this.isModified('password')) {
        this.password = await Generator.hash(this.password);
        this.salt = Generator.salt();
    }
    if (this.isNew) {
        this._hash = Generator.token();
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

User.validationOptions = (password) => ({
    username: {
        notEmpty: { errorMessage: ErrorMessages.USERNAME.REQUIRED },
        matches: { options: /^[a-z0-9._]+$/i, errorMessage: ErrorMessages.USERNAME.PATTERN },
        isLength: { options: [{ min: 4, max: 32 }], errorMessage: ErrorMessages.USERNAME.LENGTH },
        unique: { options: [{ param: 'username' }], errorMessage: ErrorMessages.USERNAME.UNIQUE }
    },
    email: {
        notEmpty: { errorMessage: ErrorMessages.EMAIL.REQUIRED },
        isEmail: { errorMessage: ErrorMessages.EMAIL.INVALID },
        unique: { options: [{ param: 'email' }], errorMessage: ErrorMessages.EMAIL.UNIQUE }
    },
    password: {
        notEmpty: { errorMessage: ErrorMessages.PASSWORD.REQUIRED },
        isLength: { options: [{ min: 6 }], errorMessage: ErrorMessages.PASSWORD.LENGTH },
    },
    rePassword: {
        notEmpty: { errorMessage: ErrorMessages.RE_PASSWORD.REQUIRED },
        equals: { options: password, errorMessage: ErrorMessages.RE_PASSWORD.MATCH }
    }
});