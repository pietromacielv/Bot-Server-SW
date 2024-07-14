const bot = require("../bot");


async function verifyUser(msg) {
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
        content: "Ocorreu um erro durante a verificação. Por favor, tente novamente mais tarde.",
      });
    }
  }
  
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
  
  module.exports = { verifyUser };