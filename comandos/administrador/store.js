const Discord = require("discord.js")

module.exports = {
  name: "store",
  description: "Painel Store",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor(0x00958F)
        .setDescription("Deseja ser dono de sua própria loja semelhante a Raccoon Smurfs ou Handlevel? fornecemos todos os produtos e BOTs necessários para você começar.")
        .setImage("https://media.discordapp.net/attachments/1147412877444128768/1148010266295013376/Captura_de_Tela_2023-09-03_as_18.41.48.png?width=941&height=284")
        
        const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
            .setCustomId("store")
            .setLabel("Conversar sobre")
            .setEmoji("<:pixel_symbol_dollar:1148010936804847748>")
            .setStyle(Discord.ButtonStyle.Secondary),
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [button] })
    }


  },
}
