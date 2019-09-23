import * as functions from 'firebase-functions';
import { botHandler } from '../handlers/bot';
import { deleteQueue } from '../modules/firestore';
import { SlackEventInterface } from '../utils/interfaces';

export default function(snapshot: functions.firestore.DocumentSnapshot): void {
  (async () => {
    const event = snapshot.data() as SlackEventInterface;
    await botHandler(event);
    await deleteQueue(snapshot.id);
  })().catch();
}
