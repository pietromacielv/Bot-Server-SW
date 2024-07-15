require('dotenv').config();

const bot = require('./bot');
const port = process.env.PORT || 4000;

bot.once('ready', () => {
  console.log('Ready!');
});

bot.login(process.env.BOT_TOKEN);
