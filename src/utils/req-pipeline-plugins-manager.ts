import { Application } from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';

class RequestPipelinePluginsManager {
  public inject(app: Application): void {
    app.use(fileUpload());
    app.use(cors());
    // app.enable('trust proxy');
  }
}

export default new RequestPipelinePluginsManager();
