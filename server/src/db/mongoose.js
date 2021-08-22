const mongoose = require('mongoose');
const log = require('../config/logger');
require('dotenv').config();

mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      log.info(`Connection to MongoDB failed`);
    } else {
      log.info(`🚀 Successfully connected with MongoDB`);
    }
  },
);

module.exports = mongoose;
