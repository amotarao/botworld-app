import { firestore } from '../modules/firebase';

export interface SlackEventMessageInterface {
  client_msg_id: string; // '2339a461-a924-4da6-baea-3c8300cddfac'
  type: string; // 'message'
  text: string;
  user: string;
  ts: string; // '1569226155.000300'
  team: string;
  channel: string;
  event_ts: string; // '1569226155.000300'
  channel_type: string; // 'channel'
}

export interface SlackEventBotMessageInterface {
  type: string; // 'message'
  subtype: string; // 'bot_message'
  text: string;
  ts: string; // '1569226155.000300'
  username: string;
  icons: { emoji: string };
  bot_id: string;
  channel: string;
  event_ts: string; // '1569226155.000300'
  channel_type: string; // 'mpim'
}

export type SlackEventInterface = SlackEventMessageInterface | SlackEventBotMessageInterface;

export interface BotsData {
  name: string;
  description: string;
  username: string;
  icon_emoji: string;
  pattern: string;
  code: string;
  storage: any;
  target_channels: string[];
  private: boolean;
  team: firestore.DocumentReference;
}

export interface FirestoreDocInterface<T> {
  id: string;
  data: T;
}
