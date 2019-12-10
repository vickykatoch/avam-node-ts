import {  SystemUsersDBHelper } from '../db';
import { ISystemUser } from '../models';

class SystemUsersRepository {

    public async getAllUsers() : Promise<ISystemUser[]> {
        const SQL ='SELECT * FROM USERS';
        return await SystemUsersDBHelper.get<ISystemUser[]>(SQL)
    }
}
export default new SystemUsersRepository();
