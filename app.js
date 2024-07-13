const Eris = require("eris");
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const Constants = Eris.Constants;

const bot = new Eris(process.env.BOT_TOKEN, {
  intents: ["ALL"],
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/generate-embed", async (req, res) => {
  const {
    title,
    description,
    field1,
    value1,
    field2,
    value2,
    image,
    color,
    thumbnail,
    footer,
    channelId,
  } = req.body;

  const embed = {
    title: title || "Exemplo de Uso",
    description: description || "",
    color: Number(color) || 0xffff00,
    fields: [
      {
        name: field1 || "",
        value: value1 || "",
      },
      {
        name: field2 || "",
        value: value2 || "",
      },
    ],
    image: {
      url: image,
    },
    thumbnail: {
      url: thumbnail,
    },
    footer: {
      text: footer,
    },
    timestamp: new Date(),
  };

  try {
    await bot.createMessage(channelId, { embed });
    res.json({ success: true });
  } catch (error) {
    console.error("Error sending embed:", error);
    res.json({ success: false, error: "Erro ao enviar embed" });
  }
});

bot.on("ready", async () => {
  console.log("Ready!");
  app.listen(3000, () => {
    console.log("Server listening on port 3000");
  });
});

bot.on("guildMemberAdd", async (guild, member) => {
  const embed = {
    title: `Bem-vindo(a) ao nosso servidor, viajante!`,
    description: `${member.mention}, sinta-se à vontade para interagir conosco em nossa comunidade.`,
    color: 0xffff00,
    fields: [
      {
        name: "Regras",
        value: "Lembre-se de ler as regras do servidor.",
      },
      {
        name: "Verificação",
        value:
          "Por favor, lembre-se de verificar a sua conta para ganhar acesso ao servidor. Aperte o botão nesta mensagem",
      },
      {
        name: "Canais",
        value: "Explore os canais disponíveis e divirta-se!",
      },
    ],
    footer: {
      text: "Obrigado por se juntar!",
    },
  };
  bot.createMessage("1257724564407062531", {
    embed,
  });

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
    await bot.createMessage(privateChannel.id, {
      embed: {
        title: `Bem-vindo(a) ao nosso servidor, ${member.username}!`,
        description: `Olá ${member.mention}, este é seu canal privado temporário para verificação. Por favor, use o comando \`!verificar\` para completar sua verificação.`,
        color: 0xffff00,
        footer: {
          text: "Obrigado por se juntar!",
        },
      },
    });
  } catch (error) {
    console.error("Erro ao criar canal privado:", error);
  }
});

bot.on("messageCreate", async (msg) => {
  if (msg.content === "!verificar") {
    const guild = msg.guildID;
    const member = msg.author.id;
    try {
      await adicionarCargoAoUsuario(guild, member);
      await bot.createMessage(msg.channel.id, {
        content: "Você foi verificado com sucesso e seu cargo foi adicionado!",
      });
      await bot.deleteChannel(msg.channel.id);
    } catch (error) {
      console.error("Erro ao verificar usuário:", error);
      await bot.createMessage(msg.channel.id, {
        content:
          "Ocorreu um erro durante a verificação. Por favor, tente novamente mais tarde.",
      });
    }
  }
});

async function adicionarCargoAoUsuario(guildID, memberID) {
  try {
    const guild = bot.guilds.get(guildID);
    const member = guild.members.get(memberID);
    const roleID = "1257744447005921291";
    await member.addRole(roleID);
    console.log(`Cargo adicionado ao usuário ${member.username}`);
  } catch (error) {
    console.error("Erro ao adicionar cargo ao usuário:", error);
  }
}

bot.connect();
