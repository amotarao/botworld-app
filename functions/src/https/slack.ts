import * as functions from 'firebase-functions';
import { env } from '../modules/env';
import { addQueueHandler } from '../handlers/addQueue';

export default function(req: functions.https.Request, resp: functions.Response): void {
  (async () => {
    if (req.body.token !== env.bot_verification_token) {
      resp.status(401).end();
    }

    switch (req.body.type) {
      case 'event_callback': {
        await addQueueHandler(req.body.event);
        resp.status(200).end();
        return;
      }
      case 'url_verification': {
        resp.status(200).send(req.body.challenge);
        return;
      }
      default: {
        console.log('example log', req.body);
      }
    }

    resp.status(200).end();
  })().catch();
}
