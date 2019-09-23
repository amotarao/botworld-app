import * as functions from 'firebase-functions';

export const env = functions.config().app as {
  bot_verification_token: string;
  tmp_slack_bot_token: string;
};
