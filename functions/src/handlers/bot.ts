import { WebClient } from '@slack/web-api';
import { getBotsByChannel } from '../modules/firestore';
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
    const pattern = new RegExp(bot.pattern);
    if (event.text.match(pattern) === null) {
      return false;
    }
    return true;
  });

  if (!matchBots.length) {
    return { status: 404, text: 'Bot Not Found' };
  }

  const results = matchBots.map((bot): boolean => {
    // ループ防止
    if ('username' in event && event.username === bot.username) {
      return false;
    }

    const slack = {
      post: (text: string) => {
        (async () => {
          await client.chat.postMessage({
            channel: event.channel,
            text,
            icon_emoji: bot.icon_emoji,
            username: bot.username,
          });
        })().catch((error) => {
          console.error(error);
        });
      },
    };

    const func = new Function('slack', `'use strict'; {${bot.code}}`);

    try {
      func(slack);
    } catch (error) {
      console.error(error);
      return false;
    }

    return true;
  });

  const result = await Promise.all(results);

  return result ? { status: 200, text: 'OK' } : { status: 500, text: 'Error' };
}
