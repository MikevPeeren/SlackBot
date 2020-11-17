require('dotenv').config();

// Requiring the Bolt
import { App } from '@slack/bolt';

// Functions
import { useEnvironment, freeEnvironment, getEnvironmentStatus } from './commands/environments';
import { getRandomQuote } from './messages/quotes';

const bot = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN,
});

// The echo command simply echoes on command
bot.command('/environments_use', useEnvironment);
bot.command('/environments_free', freeEnvironment);
bot.message('/environments_check', getEnvironmentStatus);

bot.message('dukequote', getRandomQuote);

bot.event('app_mention', async ({ context, event }) => {
  try {
    await bot.client.chat.postMessage({
      token: context.botToken,
      channel: event.channel,
      text: `Hello <@${event.user}>, I am still alive`,
    });
  } catch (e) {
    console.log(`error responding ${e}`);
  }
});

(async () => {
  // Start the app
  await bot.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
