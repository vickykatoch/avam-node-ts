import { DBHelper } from '../db';
import { ILogImageItem, LogImage } from '../models';

const TABLE_NAME = 'APP_IMAGE_LOGS_TRANS';

class ImageLogsRepository {
  async insertTran(appName: string, sid: string, type: string, env: string, data: any) {
    const tag = (data && `'${JSON.stringify(data)}'`) || null;
    const SQL = `INSERT INTO ${TABLE_NAME}(sid,ts,type,env,tag)
      VALUES('${sid}',${Date.now()},'${type}','${env}',${tag})`;
    return await DBHelper.executeSql(SQL, appName);
  }
  async getAll(appName: string, type?: LogImage): Promise<ILogImageItem[]> {
    const SQL = (type && `SELECT * FROM ${TABLE_NAME} where type='${type}'`) || `SELECT * FROM ${TABLE_NAME}`;
    return (await DBHelper.get<ILogImageItem[]>(SQL, appName)) as ILogImageItem[];
  }
}

export default new ImageLogsRepository();
