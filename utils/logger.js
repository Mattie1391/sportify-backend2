// utils/logger.js

const pino = require('pino');
const pretty = require('pino-pretty');

const logger = pino(pretty({
  level: 'debug',
  colorize: true,
  sync: true
}));

module.exports = { logger };