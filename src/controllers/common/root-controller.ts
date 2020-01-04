import { Router, Request, Response } from 'express';
import { ConfigLoader } from '../../utils';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const apps = Array.from(ConfigLoader.config.apps.values());
    res.json(apps);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export const RootController: Router = router;
