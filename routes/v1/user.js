'use strict';

const express = require('express');
const expressValidator = require('express-validator');
const _isEmpty = require('lodash/isEmpty');
const User = require('../../models/User');
const UserController = require('../../controllers/UserController');

const router = express.Router();

router.use(expressValidator({
    customValidators: {
        unique (value, options) {
            let condition = {};
            condition[options.param] = value;
            return new Promise((resolve, reject) => {
                User.findOne(condition)
                    .then(user => _isEmpty(user) ? resolve(true) : reject(user))
                    .catch(error => reject(error));
            });
        }
    }
}));

router.post('/register', UserController.actionRegister);
router.post('/login', UserController.actionLogin);
router.post('/activate', UserController.actionActivate);

module.exports = router;