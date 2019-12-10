import { IAppRequestParams } from '../models';

export function throwIfTrue(isTrue: boolean, error: string | Error) {
  if (isTrue) {
    if (error instanceof Error) throw error;
    throw new Error(error);
  }
}

const s4 = (): string =>
  Math.floor(1 + Math.random() * 0x10000)
    .toString(16)
    .substring(1);

export const uniqueId = (): string => `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
export const shortId = (): string => `${s4()}${s4()}${s4()}`;
export const dateStamp = (isLong?: boolean): string => {
  const dt = new Date();
  const month = `00${dt.getUTCMonth() + 1}`.slice(-2);
  const day = `00${dt.getUTCDay() + 1}`.slice(-2);
  if (!isLong) {
    return `${dt.getUTCFullYear()}-${month}-${day}`;
  } else {
    const hh = `00${dt.getUTCHours()}`.slice(-2);
    const mm = `00${dt.getUTCMinutes()}`.slice(-2);
    const ss = `00${dt.getUTCSeconds()}`.slice(-2);
    return `${dt.getUTCFullYear()}-${month}-${day} ${hh}:${mm}:${ss}`;
  }
};

export const readRequestHeaderInfo = (req: any): IAppRequestParams => {
  if (req.headers) {
    let message = '';
    const { appname, env, region, user, customdata } = req.headers;
    !appname && (message = 'Application name is missing from request header');
    throwIfTrue(message.length > 0, 'Request header must contain: appname, env, region, user');
    return {
      appName: appname && appname.toUpperCase(),
      env: env && env.toUpperCase(),
      region: region && region.toUpperCase(),
      user: user && user.toUpperCase(),
      customData: (customdata && JSON.parse(customdata)) || {}
    };
  }
  throw new Error('Request header must contain: application name');
};
