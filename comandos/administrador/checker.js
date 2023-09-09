const Discord = require("discord.js")

module.exports = {
  name: "checker",
  description: "Painel Checker",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
        interaction.reply({ content: `Você não possui permissão para utilzar este comando!`, ephemeral: true })
    } else {
        let embed = new Discord.EmbedBuilder()
        .setColor(0x00958F)
        .setDescription("Precisa recuperar os dados de uma conta RIOT para vendê-la ou transforma-lá em FA? Navegue pelas opções abaixos e escolha a opção desejada!");
        
        let painel = new Discord.ActionRowBuilder().addComponents(
            new Discord.StringSelectMenuBuilder()
            .setCustomId("checker_options")
            .setPlaceholder("Que tipo de conta deseja obter os dados?")
            .addOptions(
                {
                    label: "Dados - League of Legends",
                    description: "R$ 10,00 +",
                    value: "lol",
                    emoji: "<:LeageOfLegends:1147989543065239682>"
                },
                {
                    label: "Dados - Valorant",
                    description: "R$ 15,00 +",
                    value: "val",
                    emoji: "<:Valorant:1147989198998081638>"
                }
            )
        );

        interaction.reply({ content: `✅ Mensagem enviada!`, ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: [painel] })
    }


  },
}
