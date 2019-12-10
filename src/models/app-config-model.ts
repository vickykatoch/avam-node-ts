export interface IAppConfig {
  env: string;
  port: number;
  appRoot: string;
  instanceCount?: number;
  apps: Map<string, IAppInfo>;
  logsImagesInfo: ILogImageInfo;
  dataInfo: IAppDataInfo;
  freeRoutes?: string[];
  [name: string]: any;
}

export interface IAppInfo {
  key: string;
  name: string;
  isActive?: boolean;
  regions: string[];
}
export interface ILogImageInfo {
  baseDirectory: string;
  archiveInterval: string;
  archiveTarget: string;
}
export interface IAppDataInfo {
  dataPath: string;
  archiveInterval: string;
  archiveTarget: string;
}
