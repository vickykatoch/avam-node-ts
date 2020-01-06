import { ISystemUser, IRole, IResource, IRoleResource, IUserRole } from '../models';
import { SystemUsersDBHelper } from '../db';

export class UserModelRepo {
  async fetchUsers(page: number, pagSize: number, sortColumn: string = 'sid'): Promise<ISystemUser[]> {
    const SQL = 'SELECT * FROM USERS';
    return await SystemUsersDBHelper.get<ISystemUser[]>(SQL).then(users =>
      users.map((user: any) => {
        user.sid = user.id;
        user.isActive = user.isActive === 1;
        delete user.id;
        return user;
      })
    );
  }
  async fetchRoles(): Promise<IRole[]> {
    const SQL = 'SELECT * FROM ROLES';
    return await SystemUsersDBHelper.get<IRole[]>(SQL).then(roles => {
      return roles.map((role: any) => {
        role.isActive = role.isActive===1;
        role.isAdmin = role.isAdmin===1;
        return role;
      })
    });
  }
  async fetchResources(): Promise<IResource[]> {
    const SQL = 'SELECT * FROM RESOURCES';
    return await SystemUsersDBHelper.get<IResource[]>(SQL);
  }
  async fetchRoleResources(roles: number[]): Promise<IRoleResource[]> {
    const SQL = `SELECT * FROM ROLE_RESOURCES WHERE ROLE IN (${roles.join(',')})`;
    return await SystemUsersDBHelper.get<IRoleResource[]>(SQL);
  }
  async fetchUserRoles(users: string[]): Promise<IUserRole[]> {
    const SQL = `SELECT * FROM USER_ROLES WHERE USER IN (${users.map(u => `'${u}'`).join(',')})`;
    return await SystemUsersDBHelper.get<IUserRole[]>(SQL);
  }
}
export default new UserModelRepo();
