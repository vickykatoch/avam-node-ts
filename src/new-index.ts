import { isMaster, isWorker, on, fork } from 'cluster';
import { cpus } from 'os';
import { getLogger } from './utils';

const logger = getLogger(__filename);

if (isMaster) {
  on('online', worker => {
    logger.info('Worker ' + worker.process.pid + ' is online');
  });
  on('exit', (worker, code, signal) => {
    logger.info('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    logger.info('Re-starting a new worker');
    fork();
  });
  for (let i = 0; i < cpus.length; i++) {
    fork();
  }
} else {
  require('./server');
}
