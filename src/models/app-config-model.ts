export interface IAppConfig {
    env: string;
    port: number;
    instanceCount?: number;
    apps: Map<string, IAppInfo>;
    logsImagesInfo: ILogImageInfo;
    dataInfo: IAppDataInfo;
    [name: string]: any;
}

export interface IAppInfo {
    key: string;
    name: string;
    isActive?: boolean;
}
export interface ILogImageInfo {
    baseDirectory: string;
    archiveInterval: string;
    archiveTarget: string;
}
export interface IAppDataInfo {
    seedFile: string;
    archiveInterval: string;
    archiveTarget: string;
}