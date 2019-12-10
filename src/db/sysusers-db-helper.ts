import { ConfigLoader, throwIfTrue } from "../utils";
import { join } from "path";
import { existsSync } from "fs";
import { Database } from "sqlite3";

class SystemUsersDBHelper {
  private dbFilePath = "";

  init() {
    this.dbFilePath = join(ConfigLoader.config.appRoot, "config/databases/users-db.sqlite");
    throwIfTrue(!existsSync(this.dbFilePath), "Users database is not found");
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
