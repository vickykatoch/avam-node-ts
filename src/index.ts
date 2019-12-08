import express from 'express';
import MasterController from './controllers/master-controller';
// import { PluginsManager } from './utils';
import bootstrap from './bootstrap/bootstrapper';

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

bootstrap(app,__dirname);
MasterController.init(app);

app.listen(process.env.PORT, () => {
  console.log(`HTTP Server started successfully. Listening at PORT: ${PORT}`);
});
