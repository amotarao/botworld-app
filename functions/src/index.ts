import * as functions from 'firebase-functions';
import slackHandler from './https/slack';

const httpsRuntimeOptions: functions.RuntimeOptions = {
  timeoutSeconds: 10,
  memory: '2GB',
};

export const slack = functions
  .runWith(httpsRuntimeOptions)
  .region('asia-northeast1')
  .https.onRequest(slackHandler);
