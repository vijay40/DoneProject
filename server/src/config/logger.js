const winston = require('winston');

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf((info) => {
    return `${info.timestamp} ${info.level.toLocaleUpperCase()}: ${
      info.message
    }`;
  }),
);

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: logFormat,
      level: 'info',
    }),
  ],
});

module.exports = logger;
