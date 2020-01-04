import { Router, Request, Response } from 'express';
import { readRequestHeaderInfo, LogImageFileWriter } from '../../utils';
import { ImageLogsRepository } from '../../repositories';
import { UploadFileType, IAppRequestParams } from '../../models';
import { pathOr } from 'ramda';

const router: Router = Router();

const uploadFile = async (req: Request, res: Response, fileType: UploadFileType) => {
  const blob = pathOr(undefined, ['files', 'upload'], req) || pathOr(undefined, ['files', 'file'], req);
  if (blob) {
    try {
      const reqParams = readRequestHeaderInfo(req);
      const filePath = await LogImageFileWriter.writeFile(reqParams, blob, fileType);
      reqParams.customData = Object.assign(reqParams.customData || {}, {
        file: filePath
      });
      await ImageLogsRepository.insertTran(reqParams, fileType);
      res.status(200).send('OK');
    } catch (err) {
      res.status(500).send('ERROR: ' + err.message);
    }
  } else {
    res.status(400).send('No file present in the payload');
  }
};

router.post('/logs', async (req: Request, res: Response) => {
  return await uploadFile(req, res, UploadFileType.Log);
});
router.post('/images', async (req: Request, res: Response) => {
  return await uploadFile(req, res, UploadFileType.Image);
});

export const FilesUploadController: Router = router;
