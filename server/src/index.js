const app = require('./app');
const log = require('./config/logger');

const port = process.env.PORT || 5000;
app.listen(port, () => {
  log.info('=================================');
  log.info(`🚀 App listening on the port ${port}`);
  log.info('=================================');
});
