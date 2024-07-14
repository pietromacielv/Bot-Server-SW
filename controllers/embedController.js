const bot = require("../bot");


async function generateEmbed(req, res) {
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
  }
  
  module.exports = { generateEmbed };