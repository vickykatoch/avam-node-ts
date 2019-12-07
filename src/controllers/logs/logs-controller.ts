import { Router, Request, Response } from 'express';
const router: Router = Router();

const getUserNameFromRequest = (req: Request): string => {
  const user = (req.body && req.body.userName) || req.headers.userName;
  return user || 'unknownUser';
};

router.get('/', (req: Request, res: Response) => {
  // Reply with a hello world when no name param is provided
  res.send('Hello from logs controller');
});
router.post('/', (req: Request, res: Response) => {
  if (req.files && (req.files.upload || req.files.file)) {
    const blob = req.files.upload || req.files.file;
    const user = (req.body && req.body.userName) || req.headers.userName;
    const env = (req.body && req.body.env) || req.headers.env;
  } else {
    res.status(500).send('No file present in the payload');
  }
});

export const LogsController: Router = router;
