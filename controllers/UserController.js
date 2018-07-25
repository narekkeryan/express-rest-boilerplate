'use strict';

const _pick = require('lodash/pick');
const _isEmpty = require('lodash/isEmpty');
const fs = require('fs-extra');
const path = require('path');
const User = require('../models/User');
const ErrorMessages = require('../constants/ErrorMessages');
const UserStatuses = require('../constants/UserStatuses');
const Emails = require('../constants/Emails');
const Mailer = require('../components/Mailer');
const config = require('../config/env');

class UserController {
    static async actionRegister(req, res) {
        req.checkBody(User.validationOptions(req.body.password));

        req.asyncValidationErrors(true)
            .then(async () => {
                const user = await User.create(_pick(req.body, [ 'username', 'email', 'password' ]));

                const activationUrl = `${config.clientUrl}/users/activate?id=${user._id}&hash=${user._hash}`;

                const mailBody = await fs.readFile(path.join(__dirname, '../templates/activate.html'), 'utf8');

                const mailer = new Mailer(Emails.ACTIVATION.CREDENTIALS);
                await mailer.send({
                    from: Emails.ACTIVATION.NAME,
                    to: user.email,
                    subject: 'Confirm your email.',
                    html: mailBody.replace(/ACTIVATION_URL/g, activationUrl)
                });

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

    static async actionActivate(req, res) {
        const { _id, _hash } = req.body;

        if (_id.match(/^[0-9a-fA-F]{24}$/)) {
            const user = await User.findOne({ _id, _hash });

            if (!_isEmpty(user)) {
                user.status = UserStatuses.ACTIVE;
                user._hash = undefined;

                if (!!await user.save()) {
                    return res.send(true);
                }
            }
        }

        return res.send(false);
    }
}

module.exports = UserController;
