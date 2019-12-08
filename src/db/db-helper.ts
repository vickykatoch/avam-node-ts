import { join } from 'path';
import { dateStamp } from '../utils';
import { Database } from 'sqlite3';
// import { promisify } from 'util';

export class DBHelper {
  private _isInitialized = false;
  private dbFilesMap = new Map<string, string>();

  public async init(dbDirectory: string, apps: string[]): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (!this._isInitialized) {
        this._isInitialized = true;
        // apps.forEach(appName => {
        //   const dbFileName = join(dbDirectory, `${appName}-${dateStamp()}.db`);
        //   const db = new Database(dbFileName, err => {
        //     if (err) {
        //       reject(err);
        //     } else {
        //       db.close();
        //     }
        //     this.dbFilesMap.set(appName, dbFileName);
        //   });
        // });
        resolve(true);
      }
    });
  }

  public executeSql(sql: string, appName: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dbFileName = join(__dirname, '../../config/', 'f74855-444-616-cbb-f349aa58-2019-12-07.sqlite');
      const db = new Database(dbFileName).on('open', (err: Error | null) => {
        if (!err) {
          db.run(sql, (err: Error | null) => (!err ? resolve(true) : reject(err)));
        } else {
          reject(err);
        }
      });
    });
  }

  public get<T>(sql: string, appName: string): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const dbFileName = join(__dirname, '../../config/', 'f74855-444-616-cbb-f349aa58-2019-12-07.sqlite');
      const db = new Database(dbFileName).on('open', (err: Error | null) => {
        if (!err) {
          db.all(sql, (err: Error | null, rows: T) => {
            err ? reject(err) : resolve(rows);
          });
        } else {
          reject(err);
        }
      });
    });
  }

  private onDBCallback(resolve: Function, reject: Function, error: Error | null, rows: any | any[] | null) {
    if (error) {
      reject(error);
    } else {
      resolve(rows);
    }
  }
}

export default new DBHelper();
