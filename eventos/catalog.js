const Discord = require('discord.js');

const embed1 = new Discord.EmbedBuilder()
  .setColor(0x00958F)
  .setTitle(`<:ShinyBlueStaff:1148026928444485823> Verificação`)
  .setDescription("\n‎\n Um bot de verificação igual ao desse servidor, com a finalidade de impedir Selfbots de divulgações de entrarem em seu servidor.\n‎\n`R$ 10,00 / mês `\n `R$ 25,00 código fonte`\n`R$ 02,50 - 05,00` - Adicional de armazenar IDs\n‎\n made with <:javascript:1148041883382202398>");

const embed2 = new Discord.EmbedBuilder()
  .setColor(0x00958F)
  .setTitle(`<:ShinyBlueStaff:1148026928444485823> Tickets`)
  .setDescription("\n‎\n Um bot de Tickets igual ao do canal suporte ou checker, com a finalidade de realizar atendimentos privados para seus membros.\n‎\n`R$ 10,00 / mês `\n `R$ 20,00 código fonte`\n`R$ 05,00 - 07,50` - Caso haja múltiplas escolhas de tickets\n‎\n made with <:javascript:1148041883382202398>");

const embed3 = new Discord.EmbedBuilder()
  .setColor(0x00958F)
  .setTitle(`<:ShinyBlueStaff:1148026928444485823> Catálogo`)
  .setDescription("\n‎\n Um bot de Catálogo igual a esse, com a finalidade de mostrar os seus produtos (3 produtos) para seus clientes.\n‎\n`R$ 10,00 / mês `\n `R$ 35,00 código fonte`\n`R$ 0,25 - 01,00` - Por produto adicional\n‎\n made with <:javascript:1148041883382202398>");

const embed4 = new Discord.EmbedBuilder()
  .setColor(0x00958F)
  .setTitle(`<:ShinyBlueStaff:1148026928444485823> Vendas`)
  .setDescription("\n‎\n Um bot de Vendas como o da Raccoon Smurfs ou Handlevel integrado a API do Mercado Pago, com a finalidade de vender os seus produtos.\n‎\n`R$ 100,00 / mês `\n `R$ 400,00 código fonte`\n`R$ 25,00` - Adicional de atualizações futuras\n‎\n made with <:javascript:1148041883382202398>");

const actionRow = (currentPage) => new Discord.ActionRowBuilder().addComponents(
  new Discord.ButtonBuilder()
    .setCustomId("anterior")
    .setEmoji("⏪")
    .setStyle(Discord.ButtonStyle.Primary)
    .setDisabled(currentPage === 0),
  new Discord.ButtonBuilder()
    .setCustomId("close_catalog")
    .setEmoji("🔒")
    .setStyle(Discord.ButtonStyle.Danger),
  new Discord.ButtonBuilder()
    .setCustomId("proximo")
    .setEmoji("⏩")
    .setStyle(Discord.ButtonStyle.Primary)
    .setDisabled(currentPage === embeds.length - 1),
);

const embeds = [
  embed1,
  embed2,
  embed3,
  embed4
]

module.exports = async function(interaction) {
  const channelName = `📗﹒catálogo﹒${interaction.user.username}`;
  const category = interaction.guild.channels.cache.get(process.env.TICKETS) ?? null;
  const existingChannel = interaction.guild.channels.cache.find(c => c.name === channelName);

  if (existingChannel) {
    return interaction.reply({ 
      content: `Você já possui um ticket aberto em ${existingChannel}!`, 
      ephemeral: true 
    });
  }

  const channel = await interaction.guild.channels.create({
    name: channelName,
    type: Discord.ChannelType.GuildText,
    parent: category,
    permissionOverwrites: [
      {
        id: interaction.guild.id,
        deny: [
          Discord.PermissionFlagsBits.ViewChannel
        ]
      },
      {
        id: interaction.user.id,
        allow: [
          Discord.PermissionFlagsBits.ViewChannel,
          Discord.PermissionFlagsBits.SendMessages,
          Discord.PermissionFlagsBits.AttachFiles,
          Discord.PermissionFlagsBits.EmbedLinks,
          Discord.PermissionFlagsBits.AddReactions
        ]
      }
    ]
  });
  
  interaction.reply({ 
    content: `Seu ticket foi aberto no canal: ${channel}!`, 
    ephemeral: true 
  });
  
  let currentPage = 0;
  
  const message = await channel.send({ embeds: [embeds[currentPage]], components: [actionRow(currentPage)] });
  
  function updateMessage(interaction) {
    return interaction.update({
      embeds: [embeds[currentPage]],
      components: [actionRow(currentPage)],
    });
  }


  const collector = message.createMessageComponentCollector({
    componentType: 2,
    time: 45 * 60 * 1000
  });

  collector.on('collect', async (interaction) => {
    if (interaction.customId === "anterior") {
      if (currentPage > 0) {
        currentPage--;
        await updateMessage(interaction);
      }
    }

    if (interaction.customId === "proximo") {
      if (currentPage < embeds.length - 1) {
        currentPage++;
        await updateMessage(interaction)
      }
    }

    if (interaction.customId === "close_catalog") {

      interaction.reply('O canal fechará em 3 segundos, obrigado pelo interesse!')

      setTimeout(() => channel.delete().catch(() => []), 3000)

    }
    
  });

  collector.on('end', () => {
    channel.delete().catch(() => [])
  });
  
}