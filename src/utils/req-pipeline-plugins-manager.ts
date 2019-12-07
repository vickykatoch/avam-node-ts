import { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import FileSystemUtils from './file-system-utils';
import bodyParser from 'body-parser';

class RequestPipelinePluginsManager {
  public inject(app: Application): void {
    app.use(
      fileUpload({
        safeFileNames: true,
        abortOnLimit: true
      })
    );
    app.use(cors());
    app.use(bodyParser.json());
    FileSystemUtils.init('/Users/balwinderkatoch/nodejs');
    // app.enable('trust proxy');
  }
}

export default new RequestPipelinePluginsManager();
