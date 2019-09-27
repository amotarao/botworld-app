import { WebClient } from '@slack/web-api';
import { getBotsByChannel, setBotWithMerge } from '../modules/firestore';
import { env } from '../modules/env';
import { SlackEventInterface } from '../utils/interfaces';

export async function botHandler(
  event: SlackEventInterface
): Promise<{
  status: number;
  text: string;
}> {
  console.log('event_callback', JSON.stringify(event));

  if (event.type !== 'message') {
    return { status: 400, text: 'It is not message' };
  }
  if ('username' in event && event.username === 'USLACKBOT' && event.channel_type === 'im') {
    return { status: 400, text: 'It is IM to Slackbot' };
  }

  const bots = await getBotsByChannel(event.channel);
  const client = new WebClient(env.tmp_slack_bot_token);

  const matchBots = bots.filter((bot) => {
    const pattern = new RegExp(bot.data.pattern);
    if (event.text.match(pattern) === null) {
      return false;
    }
    return true;
  });

  if (!matchBots.length) {
    return { status: 404, text: 'Bot Not Found' };
  }

  const results = matchBots.map(
    async ({ id, data }): Promise<boolean> => {
      // ループ防止
      if ('username' in event && event.username === data.username) {
        return false;
      }

      const api = {
        slack: {
          message: event.text,
          user: 'user' in event ? event.user : 'UNKNOWN',
          postMessage: (text: string) => {
            (async () => {
              await client.chat.postMessage({
                channel: event.channel,
                text,
                icon_emoji: data.icon_emoji,
                username: data.username,
              });
            })().catch((error) => {
              console.error(error);
            });
          },
          addReaction: (emoji: string) => {
            (async () => {
              await client.reactions.add({
                channel: event.channel,
                timestamp: event.ts,
                name: emoji.replace(/:/g, ''),
              });
            })().catch((error) => {
              console.error(error);
            });
          },
        },
        storage: { ...data.storage },
      };

      const func = new Function('api', `'use strict'; {${data.code}}`);

      try {
        await func(api);
      } catch (error) {
        console.error(error);
        return false;
      }

      if (JSON.stringify(data.storage) !== JSON.stringify(api.storage)) {
        await setBotWithMerge(id, {
          storage: api.storage,
        });
      }

      return true;
    }
  );

  const result = await Promise.all(results);

  return result ? { status: 200, text: 'OK' } : { status: 500, text: 'Error' };
}
