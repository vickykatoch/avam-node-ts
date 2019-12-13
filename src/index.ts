import express from 'express';
import IndexController from './controllers/index-controller';
import { getLogger } from './utils';
const morgan = require('morgan');
const logger = getLogger(__filename);

const expressLogger = {
  write: (message: string) => logger.info(message)
};
import bootstrap from './bootstrap/bootstrapper';
const LOGGER_TOKENS = ':remote-addr - :remote-user :method :url :response-time ms :referrer :status';
const app: express.Application = express();
const PORT = process.env.PORT || 3000;
app.use(
  morgan(LOGGER_TOKENS, {
    stream: expressLogger
  })
);

bootstrap(app, __dirname);
IndexController.init(app);

app.listen(process.env.PORT, () => {
  logger.info(`Listening at http://localhost:${PORT}/`);
});
