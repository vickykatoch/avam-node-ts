import { Router, Request, Response } from 'express';
import { SystemUsersRepository } from '../../repositories';
import { getLogger } from '../../utils';
const router: Router = Router();
const logger = getLogger(__filename);

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await SystemUsersRepository.getAllUsers();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const userId = req.params.id && req.params.id.toUpperCase();
    const userInfo = await SystemUsersRepository.getUserInfo(userId);
    res.status(200).send(userInfo);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export const UsersController: Router = router;
