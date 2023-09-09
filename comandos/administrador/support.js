const Discord = require("discord.js")

module.exports = {
  name: "support",
  description: "Painel de Suporte",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor(0x00958F)
        .setDescription("Bem-vindo a central de atendimento da Platypus Services, clique no botão abaixo e aguarde o suporte.")
        .setImage("https://media.discordapp.net/attachments/1147412877444128768/1147412892694618203/Group_1_4.png")
        
        const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("support")
            .setLabel("Abrir Ticket")
            .setEmoji("<:Ticket:1147971593809690746>")
            .setStyle(Discord.ButtonStyle.Secondary),
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [button] })
    }


  },
}
