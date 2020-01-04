import { ConfigLoader, throwIfTrue, getLogger } from "../utils";
import { join } from "path";
import { existsSync, copyFileSync } from "fs";
import { Database } from "sqlite3";

const logger = getLogger(__filename);


class SystemUsersDBHelper {
  private dbFilePath = "";
  

  init() {
    this.dbFilePath = join(ConfigLoader.config.dataInfo.usersdbPath, "users-db.sqlite");
    if(!existsSync(this.dbFilePath)) {
      const seedFile = join(ConfigLoader.config.appRoot,'config/databases/users-db.sqlite');
      copyFileSync(seedFile, this.dbFilePath);
      logger.warn(`Users database file is not found at ${this.dbFilePath}, hence copied from seed file`);
    }   
  }

  public executeSql(sql: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const db = new Database(this.dbFilePath).on("open", (err: Error | null) => {
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

  public get<T>(sql: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const db = new Database(this.dbFilePath).on("open", (err: Error | null) => {
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
}
export default new SystemUsersDBHelper();
