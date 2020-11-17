require('dotenv').config();

// Requiring the Bolt
import { App } from '@slack/bolt';

// Functions
import { useEnvironment, freeEnvironment } from './commands/environments';
import { getEnvironmentStatus } from './messages/environments';

const bot = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

(async () => {
  // Start the app
  await bot.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();

// The echo command simply echoes on command
bot.command('/use', useEnvironment);
bot.command('/free', freeEnvironment);

bot.message('environment', getEnvironmentStatus);

bot.event('app_mention', async ({ context, event }) => {
  try {
    await bot.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      text: `Hey yoo <@${event.user}> you mentioned me`,
    });
  } catch (e) {
    console.log(`error responding ${e}`);
  }
});
