import { useState, useEffect } from 'react';
import { createContainer } from 'unstated-next';
import { firestore } from '../../modules/firebase';
import { FirestoreDocInterface, BotsData } from '../../utils/interfaces';

const botsCollection = firestore.collection('bots');

const useBotFirestore = () => {
  const [bots, setBots] = useState<FirestoreDocInterface<BotsData>[] | undefined[]>([]);
  const [id, setId] = useState<string | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const doc = botsCollection.doc(id);
      const snapshot = await doc.get();
      setBot({
        id: snapshot.id,
        data: snapshot.data() as BotsData,
      });
    })();
  }, [id]);

  return {
    bot,
    setId,
  };
};

export const BotFirestoreContainer = createContainer(useBotFirestore);
