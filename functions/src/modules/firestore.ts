import { firestore } from '../modules/firebase';
import { SlackEventInterface, BotsData, FirestoreDocInterface } from '../utils/interfaces';

const botsCollection = firestore.collection('bots');
const queuesCollection = firestore.collection('queues');

export async function addQueue(event: SlackEventInterface): Promise<void> {
  await queuesCollection.add(event);
  return;
}

export async function deleteQueue(id: string): Promise<void> {
  await queuesCollection.doc(id).delete();
  return;
}

export async function getBotsByChannel(channel: string): Promise<FirestoreDocInterface<BotsData>[]> {
  const query = botsCollection.where('target_channels', 'array-contains', channel);
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    data: doc.data() as BotsData,
  }));
}

export async function setBotWithMerge(id: string, data: Partial<BotsData>): Promise<void> {
  const doc = botsCollection.doc(id);
  await doc.set(data, { merge: true });
  return;
}
