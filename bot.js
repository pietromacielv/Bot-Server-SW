const Eris = require("eris");
const Constants = Eris.Constants;

const bot = new Eris(process.env.BOT_TOKEN, {
  intents: ["all"],
});

bot.on("guildMemberAdd", async (guild, member) => {
  const welcomeEmbed = require("./embeds/welcomeEmbed");
  bot.createMessage("1257724564407062531", { embed: welcomeEmbed(member) });

  try {
    const privateChannel = await guild.createChannel(
      `bem-vindo-${member.username}`,
      0,
      {
        permissionOverwrites: [
          {
            id: member.id,
            type: 1,
            allow: 1024,
          },
          {
            id: bot.user.id,
            type: 1,
            allow: 1024,
          },
          {
            id: guild.id,
            type: 0,
            deny: 1024,
          },
        ],
      }
    );
    const privateEmbed = require("./embeds/privateEmbed");
    await bot.createMessage(privateChannel.id, { embed: privateEmbed(member) });
  } catch (error) {
    console.error("Erro ao criar canal privado:", error);
  }
});

bot.on("messageCreate", async (msg) => {
  if (msg.content === "!verificar") {
    const verifyController = require("./controllers/verifyController");
    verifyController.verifyUser(msg);
  }
});

bot.on("messageCreate", async (msg) => {
    if (msg.content === "Ping!") {
        const responses = ["Pang!", "Peng!", "Pong!", "Pung!"];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        bot.createMessage(msg.channel.id, randomResponse);
    }
    if (msg.content.toLowerCase().startsWith('hello there')) {
        bot.createMessage(msg.channel.id, "General Kenobi!");
    }
    
});

module.exports = bot;