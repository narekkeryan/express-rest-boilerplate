'use strict';

const nodemailer = require('nodemailer');

class Mailer {
    constructor(emailCredentials) {
        this.transport = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: emailCredentials
        });
    }

    send(mailOptions) {
        return this.transport.sendMail(mailOptions);
    }
}

module.exports = Mailer;