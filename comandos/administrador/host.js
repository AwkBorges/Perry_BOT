const Discord = require("discord.js")

module.exports = {
  name: "host",
  description: "Painel Host",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor(0x00958F)
        .setDescription("Precisa hospedar seu BOT porém não sabe como? Hospedamos seu BOT com praticidade e segurança, clique no botão abaixo e converse conosco.\n\n `R$ 05,00 / mês` ")
        
        const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("host")
            .setLabel("Hospedar BOT")

            .setEmoji("<:iCloud:1148042022243012699>")
            .setStyle(Discord.ButtonStyle.Secondary),
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [button] })
    }


  },
}
