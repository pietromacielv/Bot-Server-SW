const Eris = require("eris");
const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const Constants = Eris.Constants;

const bot = new Eris(process.env.BOT_TOKEN, {
  intents: ["all"],
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

bot.on("guildMemberAdd", (guild, member) => {
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
    components: [
      {
        type: Constants.ComponentTypes.ACTION_ROW,
        components: [
          {
            type: Constants.ComponentTypes.BUTTON,
            style: Constants.ButtonStyles.PRIMARY,
            custom_id: "verify",
            label: "Verificar",
            disabled: false,
          },
        ],
      },
    ],
  });
});

bot.on("interactionCreate", (interaction) => {
  if (interaction instanceof Eris.ComponentInteraction) {
    guild = interaction.member.guild.id;
    member = interaction.member.id;
    console.log(guild, member);
    adicionarCargoAoUsuario(guild, member);
    return interaction.createMessage({
      content: "Seu cargo foi adicionado com sucesso!",
      flags: 64,
    });
  }
});

bot.connect();
