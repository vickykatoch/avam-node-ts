import { Application } from 'express';
import { UsersController } from './users/users-controller';
import { RootController } from './common/root-controller';
import { FilesUploadController } from './logs/files-upload-controller';
import { LogsQueryController } from './logs/logs-query-controller';

class IndexController {
  init(app: Application) {
    app.use('/home', RootController);
    app.use('/users', UsersController);
    app.use('/upload', FilesUploadController);
    app.use('/logsQuery', LogsQueryController);
  }
}
export default new IndexController();
