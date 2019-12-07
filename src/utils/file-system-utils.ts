import { existsSync } from 'fs';
import { throwIfTrue, uniqueId } from './common-utils';
import { join } from 'path';

class FileSystemUtils {
  private baseDirectory = '';

  public init(baseDirectory: string) {
    throwIfTrue(!existsSync(baseDirectory), 'Base directory does not exist');
    this.baseDirectory = baseDirectory;
  }

  public writeFile(appName: string, user: string, blob: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const fileName = `${user}-`;
      const directory = join(this.baseDirectory, appName, user, uniqueId());
      resolve(true);
    });
  }
}
export default new FileSystemUtils();
