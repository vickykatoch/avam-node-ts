import express from 'express';
import MasterController from './controllers/master-controller';
import { PluginsManager } from './utils';
import { getLogger } from './utils';
const morgan = require('morgan');
const logger = getLogger(__filename);
const expressLogger = {
  write: (message: string) => logger.info(message)
};
const app: express.Application = express();
const PORT = process.env.PORT || 3000;
app.use(
  morgan('combined', {
    stream: expressLogger
  })
);

logger.info('Starting Web Server');
PluginsManager.inject(app);
MasterController.init(app);

app.listen(PORT, () => {
  logger.info(`Listening at http://localhost:${PORT}/`);
});
