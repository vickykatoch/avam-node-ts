import { join } from "path";
import { throwIfTrue } from "../utils";
import { Database } from "sqlite3";
import { ConfigLoader } from "../utils";
import { existsSync, mkdirSync, copyFileSync } from "fs";


export class DBHelper {
  private _dbFilesMap = new Map<string, string>();

  public init() {
    const seedFile = join(ConfigLoader.config.appRoot, "config/databases/trans-seed-db.sqlite");
    ConfigLoader.config.apps.forEach(app => {
      app.regions.forEach(region => {
        const key = `${app.name}-${region}`.toLowerCase();
        const dbFilePath = join(ConfigLoader.config.dataInfo.dataPath, `${key}.sqlite`);
        !existsSync(ConfigLoader.config.dataInfo.dataPath) && mkdirSync(ConfigLoader.config.dataInfo.dataPath);
        if (!existsSync(dbFilePath)) {
          copyFileSync(seedFile, dbFilePath);
        }
        this._dbFilesMap.set(key, dbFilePath);
      });
    });
  }

  public executeSql(sql: string, appName: string, region: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const db = new Database(this.getDBFileName(appName,region)).on("open", (err: Error | null) => {
        if (!err) {
          db.run(sql, (err: Error | null) => {
            db.close();
            !err ? resolve(true) : reject(err)
          });
        } else {
          reject(err);
        }
      });
    });
  }

  public get<T>(sql: string, appName: string, region: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const db = new Database(this.getDBFileName(appName,region)).on("open", (err: Error | null) => {
        if (!err) {
          db.all(sql, (err: Error | null, rows: T) => {
            db.close();
            err ? reject(err) : resolve(rows);
          });
        } else {
          reject(err);
        }
      });
    });
  }

  private getDBFileName(appName: string, region: string) : string {
    const key = `${appName}-${region}`.toLowerCase();
    throwIfTrue(!this._dbFilesMap.has(key),'Database does not exist');
    return this._dbFilesMap.get(key) as string;
  }
}

export default new DBHelper();
