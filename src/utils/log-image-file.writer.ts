import { IAppRequestParams, UploadFileType } from '../models';
import { UploadedFile } from 'express-fileupload';
import { join } from 'path';
import { promisify } from 'util';
import { mkdir, exists } from 'fs';
import { throwIfTrue, dateStamp, shortId } from './common-utils';
import ConfigLoader from './config-loader';

class LogImageFileWriter {
  writeFile(options: IAppRequestParams, blob: any, fileType: UploadFileType): Promise<string> {
    this.isInputValid(options, true);
    if (fileType === UploadFileType.Log) {
      return this.writeLogFile(options, options);
    } else if (fileType === UploadFileType.Image) {
      return this.writeImageFile(options, blob);
    }
    throw new Error('Invalid file type upload');
  }
  private writeLogFile(options: IAppRequestParams, blob: any): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const { appName, env, region, user } = options;
      const ds = dateStamp();
      const directory = await this.createDirectoryRecursively(appName, region, env, user, ds, 'logs');
      const fileName = join(directory, `${user}-${ds}-${shortId()}.zip`);
      await blob.mv(fileName);
      resolve(fileName);
    });
  }
  private writeImageFile(options: IAppRequestParams, blob: any): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const { appName, env, region, user } = options;
      const ds = dateStamp();
      const directory = await this.createDirectoryRecursively(appName, region, env, user, ds, 'images');
      const fileName = join(directory, `${user}-${ds}-${shortId()}.png`);
      await blob.mv(fileName);
      resolve(fileName);
    });
  }
  private isInputValid(reqParams: IAppRequestParams, throwErrorWhenInvalid?: boolean): boolean {
    let message = '';
    const { user, env, region } = reqParams;
    (!user || user.trim().length === 0) && (message = 'User name is missing from request header');
    (!env || env.trim().length === 0) && (message = 'Application environment is missing from request header');
    (!region || region.trim().length === 0) && (message = 'Region is missing from request header');
    throwErrorWhenInvalid && message.length > 0 && throwIfTrue(true, message);
    return message.length === 0;
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
