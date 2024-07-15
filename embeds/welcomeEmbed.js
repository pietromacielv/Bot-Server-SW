const { EmbedBuilder } = require('discord.js');

function welcomeEmbed(member) {
  return new EmbedBuilder()
    .setTitle('Bem-vindo(a) ao nosso servidor, viajante!')
    .setDescription(`${member.user}, sinta-se à vontade para interagir conosco em nossa comunidade.`)
    .setColor(0xffff00)
    .addFields(
      { name: 'Regras', value: 'Lembre-se de ler as regras do servidor.' },
      { name: 'Verificação', value: 'Por favor, lembre-se de verificar a sua conta para ganhar acesso ao servidor. Aperte o botão nesta mensagem' },
      { name: 'Canais', value: 'Explore os canais disponíveis e divirta-se!' }
    )
    .setFooter({ text: 'Obrigado por se juntar!' });
}

module.exports = welcomeEmbed;
