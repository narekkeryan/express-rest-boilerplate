'use strict';

const bcrypt = require('bcrypt');
const crypto = require('crypto');

class Generator {
    static salt() {
        return Generator.string(16);
    }

    static hash(password) {
        return bcrypt.hash(password, 10);
    }

    static token() {
        return crypto.randomBytes(48).toString('hex');
    }

    static string(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
}

module.exports = Generator;