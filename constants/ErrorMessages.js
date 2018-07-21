'use strict';

module.exports = {
    USERNAME: {
        REQUIRED: 'err.username.required',
        LENGTH: 'err.username.length.from.4.to.32',
        PATTERN: 'err.username.pattern',
        UNIQUE: 'err.username.unique'
    },
    EMAIL: {
        REQUIRED: 'err.email.required',
        INVALID: 'err.email.invalid',
        UNIQUE: 'err.email.unique'
    },
    PASSWORD: {
        REQUIRED:'err.password.required',
        LENGTH: 'err.password.length.from.6',
    },
    RE_PASSWORD: {
        REQUIRED:'err.rePassword.required',
        MATCH: 'err.rePassword.match',
    },
    INVALID_CREDENTIALS: 'err.invalid.credentials'
};