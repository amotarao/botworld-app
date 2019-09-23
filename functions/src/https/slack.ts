import * as functions from 'firebase-functions';
import { env } from '../modules/env';
import { botHandler } from '../handlers/bot';

export default function(req: functions.https.Request, resp: functions.Response): void {
  (async () => {
    if (req.body.token !== env.bot_verification_token) {
      resp.status(401).end();
    }

    switch (req.body.type) {
      case 'event_callback': {
        const { status, text } = await botHandler({
          event: req.body.event,
        });
        resp.status(status).send(text);
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
