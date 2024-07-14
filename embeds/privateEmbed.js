function privateEmbed(member) {
  return {
    title: `Bem-vindo(a) ao nosso servidor, ${member.username}!`,
    description: `Olá ${member.mention}, este é seu canal privado temporário para verificação. Por favor, use o comando \`!verificar\` para completar sua verificação.`,
    color: 0xffff00,
    footer: {
      text: "Obrigado por se juntar!",
    },
  };
}

module.exports = privateEmbed;
