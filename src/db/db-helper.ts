import { join } from "path";
import { throwIfTrue, getWeek, getLogger } from "../utils";
import { Database } from "sqlite3";
import { ConfigLoader } from "../utils";
import { existsSync, mkdirSync, copyFileSync } from "fs";

const logger = getLogger(__filename);

export class DBHelper {
  private _dbFilesMap = new Map<string, string>();
  

  public init() {
    const seedFile = join(ConfigLoader.config.appRoot, "config/databases/trans-seed-db.sqlite");
    const week = getWeek(Date.now());
    ConfigLoader.config.apps.forEach(app => {
      const key = `${app.name}-${week}`.toLowerCase();
      const dbFilePath = join(ConfigLoader.config.dataInfo.transdbPath, `${key}.sqlite`);
      !existsSync(ConfigLoader.config.dataInfo.transdbPath) && mkdirSync(ConfigLoader.config.dataInfo.transdbPath);
      if (!existsSync(dbFilePath)) {
        copyFileSync(seedFile, dbFilePath);
      }
      this._dbFilesMap.set(key, dbFilePath);
    });
  }

  public executeSql(sql: string, appName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const db = new Database(this.getDBFileName(appName)).on("open", (err: Error | null) => {
        if (!err) {
          db.run(sql, (err: Error | null) => {
            db.close();
            !err ? resolve(true) : reject(err);
          });
        } else {
          reject(err);
        }
      });
    });
  }

  public get<T>(sql: string, appName: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const db = new Database(this.getDBFileName(appName)).on("open", (err: Error | null) => {
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

  private getDBFileName(appName: string): string {
    const week = getWeek(Date.now());
    const key = `${appName}-${week}`.toLowerCase();
    throwIfTrue(!this._dbFilesMap.has(key), "Database does not exist");
    return this._dbFilesMap.get(key) as string;
  }
}

export default new DBHelper();
