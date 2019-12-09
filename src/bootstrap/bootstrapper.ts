import { Application } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import { ConfigLoader } from "../utils";
import { DBHelper } from "../db";

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
  addGlobalHandlers(app);
}
function addGlobalHandlers(app: Application) {
  addGlobalRequestHandler(app);
}
function addGlobalRequestHandler(app: Application) {
  app.use(function(req: Request, res: any, next: any) {
    if (req.headers) {
      if (Array.isArray(req.headers)) {
      } else if( 'appname' in req.headers) {
        const { appname } = req.headers;
        if (appname && ConfigLoader.config.apps.has(appname)) {
          next();
          return;
        }
      }
    }
    res.status(500).send("UnAuthorised");
  });
}
