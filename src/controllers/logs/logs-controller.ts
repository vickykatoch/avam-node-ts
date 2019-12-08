import { Router, Request, Response } from 'express';
import { FileSystemUtils } from '../../utils';
import { ImageLogsRepository } from '../../repositories';
import { LogImage } from '../../models';

const router: Router = Router();

const readCustomDataFromRequest = (req: Request): any => {
  let data: any;
  try {
    data = req.body && req.body.meta ? JSON.parse(req.body.meta) : undefined;
  } catch (err) {
    console.log('Invalid custom data');
  }
  return data;
};

router.get('/', async (req: Request, res: Response) => {
  try {
    const appKey = req.headers.appKey as string;
    const items = await ImageLogsRepository.getAll(appKey, LogImage.Log);
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send('Error : ' + err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  if (req.files && (req.files.upload || req.files.file)) {
    try {
      const blob = req.files.upload || req.files.file;
      const user = (req.body && req.body.userName) || req.headers.userName;
      const env = (req.body && req.body.env) || req.headers.env || 'UNKNOWN';
      const appName = (req.body && req.body.appName) || req.headers.appName || 'UNKNOWN';
      const uploadedFile = await FileSystemUtils.writeFile(appName.toUpperCase(), env.toUpperCase(), user.toUpperCase(), 'LOGS', blob);
      const data = Object.assign(readCustomDataFromRequest(req) || {}, {
        fileName: uploadedFile
      });
      const result = await ImageLogsRepository.insertTran('JXT', user, LogImage.Log, env, data);
      res.status(200).send('OK');
    } catch (err) {
      res.status(500).send('ERROR: ' + err.message);
    }
  } else {
    res.status(400).send('No file present in the payload');
  }
});

export const LogsController: Router = router;
