import { DBHelper } from '../db';
import { ILogImageItem, UploadFileType, IAppRequestParams } from '../models';

const TABLE_NAME = 'APP_IMAGE_LOGS_TRANS';

class ImageLogsRepository {
  async insertTran(options: IAppRequestParams, type: UploadFileType) {
    const tag = `'${JSON.stringify(options.customData)}'`;
    const SQL = `INSERT INTO ${TABLE_NAME}(sid,ts,region, type,env,tag)
      VALUES('${options.user}',${Date.now()},'${options.region}','${type}','${options.env}',${tag})`;
    return await DBHelper.executeSql(SQL, options.appName);
  }
  async getAll(appName: string, type?: UploadFileType): Promise<ILogImageItem[]> {
    const SQL = (type && `SELECT * FROM ${TABLE_NAME} where type='${type}'`) || `SELECT * FROM ${TABLE_NAME}`;
    return await DBHelper.get<ILogImageItem[]>(SQL, appName);
  }
  async getDateFiltered(appName: string, start: number, end: number): Promise<ILogImageItem[]> {
    const SQL = `select * from ${TABLE_NAME} where ts >=${start} and ts<=${end}`;
    return await DBHelper.get<ILogImageItem[]>(SQL, appName);
  }
}

export default new ImageLogsRepository();
