import { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import FileSystemUtils from './file-system-utils';
import bodyParser from 'body-parser';
import { DBHelper } from '../db';
import { join } from 'path';

class RequestPipelinePluginsManager {
  public async inject(app: Application) {
    app.use(
      fileUpload({
        safeFileNames: true,
        abortOnLimit: true
      })
    );
    app.use(cors());
    app.use(bodyParser.json());
    await DBHelper.init(join(__dirname, '../../config'), ['f74855-444-616-cbb-f349aa58']);
    FileSystemUtils.init('/Users/balwinderkatoch/nodejs');
    // app.enable('trust proxy');
  }
}

export default new RequestPipelinePluginsManager();
