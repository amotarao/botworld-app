import { firestore } from '../modules/firebase';
import { BotsData } from '../utils/interfaces';

const botsCollection = firestore.collection('bots');

export async function getBotsByChannel(channel: string): Promise<BotsData[]> {
  const query = botsCollection.where('target_channels', 'array-contains', channel);
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => doc.data() as BotsData);
}
