import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { throwIfTrue } from "./common-utils";
import { safeLoad } from 'js-yaml';
import { IAppConfig, IAppInfo } from '../models';
import { argv } from 'yargs';


class ConfigLoader {
    private _configFilePath ='';
    private _rootDirectory='';
    private _config: any;

    loadAndValidate(appRootDirectory: string) {
        this._rootDirectory = appRootDirectory;
        // this._configFilePath = join(appRootDirectory,CONFIG_RELATIVE_PATH);
        const {config} = argv;
        this._configFilePath = config as string;
        throwIfTrue(!existsSync(this._configFilePath),`Application configuration file is not found in : ${this._configFilePath}`);
        const doc = safeLoad(readFileSync(this._configFilePath,'utf-8'),{ json: true});
        this._config = Object.freeze(this.getAppConfig(doc));
        process.env.PORT = this.config.port.toString();
        process.env.enviroment = this.config.env;
    }
    get config() : IAppConfig {
        return this._config;
    }
    private getAppConfig(doc: any) : IAppConfig {
        throwIfTrue(!doc.env, 'Application enviroment is not configured for the application');
        throwIfTrue(!doc.port, 'TCP port is not configured for the application');
        throwIfTrue(!this.isAppsConfigSectionValid(doc.apps), 'Invalid/missing "apps" config section');
        const appConfig: IAppConfig = doc as IAppConfig;
        const appMap = new Map<string, IAppInfo>()
        Object.keys(doc.apps).forEach(appName=> {
            const { key, isActive,regions } = doc.apps[appName];
            isActive && appMap.set(appName, {key, isActive, name: appName, regions});
        });
        appConfig.apps=appMap;
        appConfig.appRoot=this._rootDirectory;
        return appConfig;
    }
    private isAppsConfigSectionValid(apps: any) : boolean {
        if(apps && apps instanceof Object && !(apps instanceof Date) && Object.keys(apps).length) {
            return Object.values(apps).filter((x: any)=> x.isActive).length>0;
        }
        return false;
    }
}
export default new ConfigLoader();