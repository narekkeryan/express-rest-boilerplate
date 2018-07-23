'use strict';

const isEmpty = require('lodash/isEmpty');
const passport = require('passport');
const Passport = require('passport-jwt');
const User = require('../models/User');
const config = require('../config/env');

const JwtStrategy = Passport.Strategy;
const ExtractJwt = Passport.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (isEmpty(user) || user.salt != payload.salt) {
            return done(null, null);
        }

        done(null, user);
    } catch (error) {
        done(error, null);
    }
}));

module.exports = passport.authenticate('jwt', { session: false });