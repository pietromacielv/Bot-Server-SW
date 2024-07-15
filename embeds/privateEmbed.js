const { EmbedBuilder } = require('discord.js');

function privateEmbed(member) {
  return new EmbedBuilder()
    .setTitle(`Bem-vindo(a) ao nosso servidor, ${member.user.username}!`)
    .setDescription(`Olá <@${member.id}>, este é seu canal privado temporário para verificação. Por favor, use o comando \`!verificar\` para completar sua verificação.`)
    .setColor(0xffff00)
    .setFooter({ text: 'Obrigado por se juntar!' });
}

module.exports = privateEmbed;
