import { Application } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ConfigLoader, readRequestHeaderInfo, getLogger } from '../utils';
import { DBHelper, SystemUsersDBHelper } from '../db';
import { IAppRequestParams } from '../models';

const logger = getLogger(__filename);
const isFreeRoute = (path: string): boolean => {
  if (ConfigLoader.config.freeRoutes) {
    return ConfigLoader.config.freeRoutes.some(route => route.toLowerCase() === path.toLowerCase());
  }
  return false;
};

export default function bootstrap(app: Application, appRoot: string) {
  app.use(
    fileUpload({
      safeFileNames: true,
      abortOnLimit: true
    })
  );
  app.use(cors());
  app.use(bodyParser.json());
  // app.enable('trust proxy');
  ConfigLoader.loadAndValidate(appRoot);
  DBHelper.init();
  SystemUsersDBHelper.init();
  addGlobalHandlers(app);
  logger.info('Request pipeline plugins added successfully');
}
function addGlobalHandlers(app: Application) {
  addGlobalRequestHandler(app);
}
function addGlobalRequestHandler(app: Application) {
  // app.use(function(req: Request, res: any, next: any) {
  //   if (req.headers) {
  //     try {
  //       if (isFreeRoute((req as any).path)) {
  //         next();
  //         return;
  //       } else {
  //         const appRequestParams = readRequestHeaderInfo(req) as IAppRequestParams;
  //         if (ConfigLoader.config.apps.has(appRequestParams.appName)) {
  //           (req as any).reqParams = appRequestParams;
  //           next();
  //           return;
  //         }
  //       }
  //     } catch (err) {
  //       res.status(500).send('Error : ' + err.message);
  //       logger.error(err);
  //     }
  //   }
  //   logger.error('Invalid/missing request header');
  //   res.status(403).send('403 Forebiden');
  // });
}
