import { firestore } from '../modules/firebase';

const botsCollection = firestore.collection('bots');

export interface BotsData {
  name: string;
  description: string;
  username: string;
  icon_emoji: string;
  pattern: string;
  code: string;
  target_channels: string[];
  private: boolean;
  team: FirebaseFirestore.DocumentReference;
}

export async function getBotsByChannel(channel: string): Promise<BotsData[]> {
  const query = botsCollection.where('target_channels', 'array-contains', channel);
  const snapshot = await query.get();
  return snapshot.docs.map((doc) => doc.data() as BotsData);
}
