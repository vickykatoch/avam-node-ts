import { Router, Request, Response } from 'express';
import { readRequestHeaderInfo, LogImageFileWriter } from '../../utils';
import { ImageLogsRepository } from '../../repositories';
import { UploadFileType, IAppRequestParams } from '../../models';

const router: Router = Router();

const readCustomDataFromRequest = (req: Request): any => {
  let data: any;
  try {
    data = req.body && req.body.meta ? JSON.parse(req.body.meta) : undefined;
  } catch (err) {
    console.log('Invalid custom data');
  }
  return data;
};

router.get('/', async (req: Request, res: Response) => {
  try {
    const appKey = req.headers.appKey as string;
    const items = await ImageLogsRepository.getAll(appKey, UploadFileType.Image);
    res.status(200).send(items);
  } catch (err) {
    res.status(500).send('Error : ' + err.message);
  }
});

router.post('/', async (req: Request, res: Response) => {
  // if (req.files && (req.files.upload || req.files.file)) {
  //   try {
  //     const blob = req.files.upload || req.files.file;
  //     const reqParams = readRequestHeaderInfo(req) as IAppRequestParams;
  //     const uploadedFile = await LogImageFileWriter.writeLogFile(reqParams, blob);
  //     reqParams.customData = Object.assign(reqParams.customData || {}, {
  //       fileName: uploadedFile
  //     });
  //     // const result = await ImageLogsRepository.insertTran('JXT', user, LogImage.Image, env, data);
  //     res.status(200).send('OK');
  //   } catch (err) {
  //     res.status(500).send('ERROR: ' + err.message);
  //   }
  // } else {
  //   res.status(400).send('No file present in the payload');
  // }
});

export const ImagesController: Router = router;
