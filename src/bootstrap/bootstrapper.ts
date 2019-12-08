import { Application } from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";
import { ConfigLoader } from "../utils";

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
  addGlobalHandlers(app);
}
function addGlobalHandlers(app: Application) {
  addGlobalRequestHandler(app);
}
function addGlobalRequestHandler(app: Application) {
  app.use(function(req: Request, res: any, next: any) {
    if (req.headers) {
      if (Array.isArray(req.headers)) {
      } else if( 'appkey' in req.headers) {
        const { appkey } = req.headers;
        if (appkey && ConfigLoader.config.apps.has(appkey)) {
          next();
        }
      }
    }
    res.status(500).send("UnAuthorised");
  });
}
