import { IAppRequestParams } from "../models";
import { UploadedFile } from "express-fileupload";
import { join } from "path";
import { promisify } from "util";
import { mkdir, exists } from "fs";
import { throwIfTrue, dateStamp, shortId } from "./common-utils";
import ConfigLoader from "./config-loader";

class LogImageFileWriter {
    
  writeLogFile(options: IAppRequestParams, blob: any): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const { appName, env, region, user } = options;
      const ds = dateStamp();
      const directory = await this.createDirectoryRecursively(
        appName.toLowerCase(),
        region.toLowerCase(),
        env.toLowerCase(),
        user.toLowerCase(),
        ds,
        "logs"
      );
      const fileName = join(directory,`${user}-${ds}-${shortId()}.log`);
      await blob.mv(fileName);
      resolve(fileName);
    });
  }

  private async createDirectoryRecursively(...dirs: string[]): Promise<string> {
    let directory = ConfigLoader.config.logsImagesInfo.baseDirectory;
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

export default new LogImageFileWriter();
