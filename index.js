'use strict';

const express = require('express');
const app = express();

const config = require('./config/env');
const connection = require('./config/database');
const v1Router = require('./routes/v1');

app.use(express.json());
app.use('/v1', v1Router);

app.listen(config.port, console.log(`Listening to ${config.port}!`));