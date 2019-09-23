import * as functions from 'firebase-functions';
import slackHandler from './https/slack';
import onCreateQueueHandler from './firestore/onCreateQueue';

export const slack = functions
  .runWith({
    timeoutSeconds: 3,
    memory: '512MB',
  })
  .region('asia-northeast1')
  .https.onRequest(slackHandler);

export const onCreateQueue = functions
  .runWith({
    timeoutSeconds: 10,
    memory: '2GB',
  })
  .region('asia-northeast1')
  .firestore.document('/queues/{queueId}')
  .onCreate(onCreateQueueHandler);
