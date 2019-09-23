import { addQueue } from '../modules/firestore';
import { SlackEventInterface } from '../utils/interfaces';

export async function addQueueHandler(event: SlackEventInterface): Promise<void> {
  await addQueue(event);
  return;
}
