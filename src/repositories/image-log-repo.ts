import { DBHelper } from "../db";
import { ILogImageItem, LogImage, IAppRequestParams } from "../models";

const TABLE_NAME = "APP_IMAGE_LOGS_TRANS";

class ImageLogsRepository {
  async insertTran(options: IAppRequestParams, type: LogImage) {
    const tag = `'${JSON.stringify(options.customData)}'`;
    const SQL = `INSERT INTO ${TABLE_NAME}(sid,ts,region, type,env,tag)
      VALUES('${options.user}',${Date.now()},'${options.region}','${type}','${options.env}',${tag})`;
    return await DBHelper.executeSql(SQL, options.appName, options.region);
  }
  async getAll(appName: string, region: string, type?: LogImage): Promise<ILogImageItem[]> {
    const SQL = (type && `SELECT * FROM ${TABLE_NAME} where type='${type}'`) || `SELECT * FROM ${TABLE_NAME}`;
    return (await DBHelper.get<ILogImageItem[]>(SQL, appName, region)) as ILogImageItem[];
  }
}

export default new ImageLogsRepository();
