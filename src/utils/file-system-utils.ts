import { existsSync, exists, mkdir, promises } from 'fs';
import { throwIfTrue, dateStamp, shortId } from './common-utils';
import { join } from 'path';
import { promisify } from 'util';
import { UploadedFile } from 'express-fileupload';

class FileSystemUtils {
  private baseDirectory = '';

  public init(baseDirectory: string) {
    throwIfTrue(!existsSync(baseDirectory), 'Base directory does not exist');
    this.baseDirectory = baseDirectory;
  }

  public writeFile(appName: string, env: string, user: string, fileType: string, blob: any): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      const ds = dateStamp();
      const fileName = `${user}-${ds}-${shortId()}.log`;
      const directory = await this.createDirectoryRecursively(appName, env, user, ds, fileType);
      await blob.mv(join(directory, fileName));
      resolve(true);
    });
  }

  private async createDirectoryRecursively(...dirs: string[]): Promise<string> {
    let dir = this.baseDirectory;
    if (Array.isArray(dirs) && dirs.length) {
      for (let i = 0; i < dirs.length; i++) {
        dir = join(dir, dirs[i]);
        const exist = await promisify(exists)(dir);
        if (!exist) {
          await promisify(mkdir)(dir);
          const verify = await promisify(exists)(dir);
          throwIfTrue(!verify, `Unable to create directory : ${dir}`);
        }
      }
    }
    return dir;
  }
}
export default new FileSystemUtils();
