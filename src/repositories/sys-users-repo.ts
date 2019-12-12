import { SystemUsersDBHelper } from '../db';
import { ISystemUser, IRole, IResource } from '../models';
import { firstOrEmpty } from '../utils';

class SystemUsersRepository {
  public async getAllUsers(): Promise<ISystemUser[]> {
    const SQL = 'SELECT * FROM USERS';
    return await SystemUsersDBHelper.get<ISystemUser[]>(SQL);
  }
  public async getUserInfo(userId: string): Promise<ISystemUser | undefined> {
    let SQL = `SELECT * FROM USERS WHERE id='${userId}'`;
    const user = firstOrEmpty(await SystemUsersDBHelper.get<ISystemUser>(SQL));
    if (user) {
      SQL = `select distinct r.*
            from roles r, user_roles ur
            where r.id = ur.role and ur.user='${userId}'
        `;
      const roles = await SystemUsersDBHelper.get<IRole[]>(SQL);
      SQL = `select distinct res.*
            from resources res, role_resources rres, user_roles ur
            where res.id = rres.resource and rres.role = ur.role 
            and ur.user='${userId}'`;
      const resources = await SystemUsersDBHelper.get<IResource[]>(SQL);
      return { ...user, roles, resources } as ISystemUser;
    }
    return undefined;
  }
}
export default new SystemUsersRepository();
