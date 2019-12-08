export interface ILogImageItem {
  id: number;
  sid: string;
  env: string;
  ts: number;
  type: string;
  tag: any;
}

export enum LogImage {
  Image = 'IMAGE',
  Log = 'LOG'
}
