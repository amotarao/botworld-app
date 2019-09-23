import { firestore } from '../modules/firebase';
import { SlackEventInterface, BotsData } from '../utils/interfaces';

const botsCollection = firestore.collection('bots');
const queuesCollection = firestore.collection('queues');

export async function addQueue(event: SlackEventInterface): Promise<void> {
  await queuesCollection.add(event);
  return;
}

export async function getBotsByChannel(channel: string): Promise<BotsData[]> {
  const query = botsCollection.where('target_channels', 'array-contains', channel);
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => doc.data() as BotsData);
}
