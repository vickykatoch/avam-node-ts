import { Application } from 'express';
import { LogsController } from './logs/logs-controller';
import { ImagesController } from './logs/images-controller';
import { UsersController } from './users/users-controller';

class MasterController {
  init(app: Application) {
    app.use('/logs', LogsController);
    app.use('/images', ImagesController);
    app.use('/users', UsersController);
  }
}
export default new MasterController();
