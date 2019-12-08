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

  public writeFile(appName: string, env: string, user: string, fileType: string, blob: any): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const ds = dateStamp();
      const directory = await this.createDirectoryRecursively(appName, env, ds, user, fileType);
      const fileName = join(directory, `${user}-${ds}-${shortId()}.log`);
      await blob.mv(fileName);
      resolve(fileName);
    });
  }  
  private async createDirectoryRecursively(...dirs: string[]): Promise<string> {
    let directory = this.baseDirectory;
    if (Array.isArray(dirs) && dirs.length) {
      for (let i = 0; i < dirs.length; i++) {
        directory = join(directory, dirs[i]);
        const exist = await promisify(exists)(directory);
        if (!exist) {
          await promisify(mkdir)(directory);
          const verified = await promisify(exists)(directory);
          throwIfTrue(!verified, `Unable to create directory : ${directory}`);
        }
      }
    }
    return directory;
  }
}
export default new FileSystemUtils();
