'use strict';

const _pick = require('lodash/pick');
const User = require('../models/User');

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

    }
}

module.exports = UserController;