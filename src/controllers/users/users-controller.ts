import { Router, Request, Response } from 'express';
import { SystemUsersRepository, UserModelRepo } from '../../repositories';
import { getLogger } from '../../utils';
const router: Router = Router();
const logger = getLogger(__filename);

router.get('/models', async (req: Request, res: Response) => {
  console.log('Request received');
  const response: Record<string, any[]> = {};
  const users = await UserModelRepo.fetchUsers(1, 10);
  response.users = users;
  const roles = await UserModelRepo.fetchRoles();
  response.roles = roles;
  response.resources = await UserModelRepo.fetchResources();
  response.roleResources = await UserModelRepo.fetchRoleResources(roles.map(i => i.id));
  response.userRoles = await UserModelRepo.fetchUserRoles(users.map(i => i.sid));
  res.status(200).send(response);
});

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
