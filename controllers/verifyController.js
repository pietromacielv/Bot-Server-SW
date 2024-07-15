const bot = require('../bot');

async function verifyUser(msg) {
  const guild = msg.guild;
  const member = msg.member; 
  try {
    await adicionarCargoAoUsuario(guild, member);
    await msg.channel.send({
      content: 'Você foi verificado com sucesso e seu cargo foi adicionado!',
    });
    await msg.channel.delete();
  } catch (error) {
    console.error('Erro ao verificar usuário:', error);
    await msg.channel.send({
      content: 'Ocorreu um erro durante a verificação. Por favor, tente novamente mais tarde.',
    });
  }
}


async function adicionarCargoAoUsuario(guild, member) {
  try {
    const roleID = '1257744447005921291';
    const role = guild.roles.cache.get(roleID);
    if (role) {
      await member.roles.add(role);
      console.log(`Cargo adicionado ao usuário ${member.user.username}`);
    } else {
      console.error('Role não encontrada');
    }
  } catch (error) {
    console.error('Erro ao adicionar cargo ao usuário:', error);
  }
}

module.exports = { verifyUser };

