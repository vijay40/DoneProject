const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();
require('./db/mongoose');

const api = require('./router');

const app = express();

app.use(morgan('dev'));
app.use(cors({ credentials: true }));
app.use(express.json());

app.use('/api', api);

module.exports = app;
