import { Router, Request, Response } from 'express';
import { SystemUsersRepository } from '../../repositories';
const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await SystemUsersRepository.getAllUsers();
    res.status(200).send(users);
  } catch(err) {
    res.status(500).send(err.message);
  }
});

export const UsersController: Router = router;
