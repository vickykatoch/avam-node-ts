import { Router, Request, Response } from 'express';
import { ImageLogsRepository } from '../../repositories';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const appName = req.query.timeOffset;
    const response = ImageLogsRepository.getDateFiltered(appName, '', 1, 10);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send('Error : ' + err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {});

export const LogsQueryController: Router = router;
