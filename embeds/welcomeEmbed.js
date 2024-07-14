function welcomeEmbed(member) {
    return {
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
          value: "Por favor, lembre-se de verificar a sua conta para ganhar acesso ao servidor. Aperte o botão nesta mensagem",
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
  }
  
  module.exports = welcomeEmbed;