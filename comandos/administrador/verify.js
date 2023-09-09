const Discord = require("discord.js")

module.exports = {
  name: "verify",
  description: "Painel de verificação contra BOTS",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor(0x00958F)
        .setDescription("Seja bem-vindo a Platypus Services, aqui você encontrará uma gama de serviços.\n Para realizar a verificação e obter acesso ao servidor, clique no botão abaixo e digite a palavra passe: **PERRY**")
        
        const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("verify")
            .setLabel("Realizar verificação")
            .setEmoji("<a:VerifyGreen:1147970006852849927>")
            .setStyle(Discord.ButtonStyle.Secondary),
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [button] })
    }


  },
}
