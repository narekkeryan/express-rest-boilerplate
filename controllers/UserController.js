'use strict';

const _pick = require('lodash/pick');
const _isEmpty = require('lodash/isEmpty');
const User = require('../models/User');
const ErrorMessages = require('../constants/ErrorMessages');

class UserController {
    static async actionRegister(req, res) {
        req.checkBody(User.validationOptions(req.body.password));

        req.asyncValidationErrors(true)
            .then(async () => {
                const user = await User.create(_pick(req.body, [ 'username', 'email', 'password' ]));
                return res.json({ user: user });
            })
            .catch(errors => {
                return res.status(400).json({ errors: errors });
            });
    }

    static async actionLogin(req, res) {
        const { username = '', password } = req.body;

        const user = await User.findOne({ username: username });

        if (_isEmpty(user) || !await user.comparePassword(password)) {
            return res.status(401).json({
                message: ErrorMessages.INVALID_CREDENTIALS
            });
        } else if (!user.enabled()) {
            return res.status(403).json({
                message: ErrorMessages.DISABLED
            });
        }

        return res.json({
            user,
            token: user.generateToken()
        });
    }
}

module.exports = UserController;