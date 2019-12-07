import { Router, Request, Response } from 'express';
import { FileSystemUtils } from '../../utils';
const router: Router = Router();

const getUserNameFromRequest = (req: Request): string => {
  const user = (req.body && req.body.userName) || req.headers.userName;
  return user || 'unknownUser';
};

router.get('/', (req: Request, res: Response) => {
  // Reply with a hello world when no name param is provided
  res.send('Hello from logs controller');
});
router.post('/', async (req: Request, res: Response) => {
  if (req.files && (req.files.upload || req.files.file)) {
    try {
      const blob = req.files.upload || req.files.file;
      const user = (req.body && req.body.userName) || req.headers.userName;
      const env = (req.body && req.body.env) || req.headers.env || 'UNKNOWN';
      const appName = (req.body && req.body.appName) || req.headers.appName || 'UNKNOWN';
      await FileSystemUtils.writeFile(appName.toUpperCase(), env.toUpperCase(), user.toUpperCase(), 'LOGS', blob);
      res.send('OK');
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(500).send('No file present in the payload');
  }
});

export const LogsController: Router = router;
