const Discord = require("discord.js")

module.exports = {
  name: "catalog",
  description: "Painel de Catalogo de BOTS",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setTitle("Discord BOTs")
        .setColor(0x00958F)
        .setDescription("Acesse nosso catálogo de BOTs ou peça um orçamento através da sua idéia.")
        
        const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("catalog")
            .setLabel("Catálogo")
            .setEmoji("<:Developer:1147997118359941261>")
            .setStyle(Discord.ButtonStyle.Secondary),
            new Discord.ButtonBuilder()
            .setCustomId("orcamento")
            .setLabel("Orçamento")
            .setEmoji("<a:BlackMoneyCard:1147996408461410408>")
            .setStyle(Discord.ButtonStyle.Secondary),
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [button] })
    }


  },
}
