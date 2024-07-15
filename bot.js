const { EmbedBuilder } = require("@discordjs/builders");
const { Client, GatewayIntentBits, Partials, Embed } = require("discord.js");
const Color = require("color");
require("dotenv").config();

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

const commands = [{ name: "form", description: "Cria um formulário!" }];

bot.on("guildMemberAdd", async (member) => {
  const welcomeEmbed = require("./embeds/welcomeEmbed");
  const channel = bot.channels.cache.get("1257724564407062531");
  if (channel) {
    channel.send({ embeds: [welcomeEmbed(member)] });
  }

  const { ChannelType, PermissionsBitField } = require("discord.js");

  try {
    const privateChannel = await member.guild.channels.create({
      name: `bem-vindo-${member.user.username}`,
      type: ChannelType.GuildText,
      permissionOverwrites: [
        {
          id: member.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: bot.user.id,
          allow: [PermissionsBitField.Flags.ViewChannel],
        },
        {
          id: member.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        },
      ],
    });
    const privateEmbed = require("./embeds/privateEmbed");
    await privateChannel.send({ embeds: [privateEmbed(member)] });
  } catch (error) {
    console.error("Erro ao criar canal privado:", error);
  }
});

bot.login(process.env.BOT_TOKEN);

module.exports = bot;
