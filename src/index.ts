import express from 'express';
import MasterController from './controllers/master-controller';
import { PluginsManager } from './utils';

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

PluginsManager.inject(app);
MasterController.init(app);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}/`);
});
