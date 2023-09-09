require('dotenv').config();
const fs = require('fs');
const Discord = require('discord.js');
const { Client, GatewayIntentBits, ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = Discord;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

client.slashCommands = new Discord.Collection();
require('./handler')(client);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', (interaction) => {

  if (interaction.type === Discord.InteractionType.ApplicationCommand) {

    const command = client.slashCommands.get(interaction.commandName);

    if (command) {
      command.run(client, interaction);
    }

  }
  
});

client.on("interactionCreate", (interaction) => {

  if (interaction.isButton()) {

    if (interaction.customId === 'catalog') {
      require('./eventos/catalog')(interaction);
    }

    if (interaction.customId === 'verify') {

      const modal = new ModalBuilder()
        .setCustomId('verifyModal')
        .setTitle(`Verificação ${process.env.NAME}`);

      const passwordInput = new TextInputBuilder()
        .setCustomId('passwordInput')
        .setLabel("Digite a palavra passe")
        .setStyle(TextInputStyle.Short);

      const firstActionRow = new ActionRowBuilder().addComponents(passwordInput);

      modal.addComponents(firstActionRow);

      interaction.showModal(modal);
      
    }

    if (interaction.customId === 'support'){

      const modal = new ModalBuilder()
      .setCustomId('supportModal')
      .setTitle(`Suporte ${process.env.NAME}`);

      const questionInput = new TextInputBuilder()
        .setCustomId('questionInput')
        .setLabel("Digite o seu problema ou dúvida")
        .setStyle(TextInputStyle.Paragraph);

      const firstActionRow = new ActionRowBuilder().addComponents(questionInput);

      modal.addComponents(firstActionRow);

      interaction.showModal(modal);

    }

    if(interaction.customId === 'close'){

      interaction.reply('Obrigado, o canal fechará em 5 segundos!')

      setTimeout(() => {
        try {
          interaction.channel.delete()
        } catch (e) {
          return;
        }
      }, 5000)

    }

    if (interaction.customId === "help") {
      interaction.reply(`Fomos notificados! por favor aguarde e alguém com o cargo <@&${process.env.ADM}> irá lhe atender.`)
    }

    if (interaction.customId === "pix") {
      interaction.reply(`servicesplatypus@gmail.com`)
    }

    if (interaction.customId === "orcamento"){

      const modal = new ModalBuilder()
      .setCustomId('orcamentoModal')
      .setTitle(`Orçamento ${process.env.NAME}`);

      const ideiaInput = new TextInputBuilder()
        .setCustomId('ideiaInput')
        .setLabel("Digite a sua idéia")
        .setStyle(TextInputStyle.Paragraph);

      const firstActionRow = new ActionRowBuilder().addComponents(ideiaInput);

      modal.addComponents(firstActionRow);

      interaction.showModal(modal);
      
    }

    if (interaction.customId === "store"){
    
      const channel_name = `🏭﹒store﹒${interaction.user.username}`;
      const text_category_id = process.env.TICKETS
      
      if (!interaction.guild.channels.cache.get(text_category_id)) text_category_id = null;

      if (interaction.guild.channels.cache.find(c => c.name === channel_name)) {
        interaction.reply({ content: ` Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === channel_name)}!`, ephemeral: true })
      } else {

        interaction.guild.channels.create({
          name: channel_name,
          type: Discord.ChannelType.GuildText,
          parent: text_category_id,
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
        }).then((ch) => {

          const embed = new Discord.EmbedBuilder()
            .setColor(0x00958F)
            .setTitle(`Bem-vindo ${interaction.user.username}`)
            .setDescription(`Aguarde e iremos lhe atender!`)
          const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("close")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger),
            new Discord.ButtonBuilder()
              .setCustomId("help")
              .setEmoji("📞")
              .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
              .setCustomId("pix")
              .setEmoji("<:pix:1147993323282366504>")
              .setStyle(Discord.ButtonStyle.Secondary),
          );

          ch.send({ embeds: [embed], components: [button]})
          interaction.reply({ content: `Seu ticket foi aberto no canal: ${ch}`, ephemeral: true })

        })
      }

    }

    if (interaction.customId === "host"){

      const channel_name = `🤖﹒hospedagem﹒${interaction.user.username}`;
      const text_category_id = process.env.HOST
      
      if (!interaction.guild.channels.cache.get(text_category_id)) text_category_id = null;

      if (interaction.guild.channels.cache.find(c => c.name === channel_name)) {
        interaction.reply({ content: ` Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === channel_name)}!`, ephemeral: true })
      } else {

        interaction.guild.channels.create({
          name: channel_name,
          type: Discord.ChannelType.GuildText,
          parent: text_category_id,
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
        }).then((ch) => {

          const embed = new Discord.EmbedBuilder()
            .setColor(0x00958F)
            .setTitle(`Bem-vindo a sua página de HOST ${interaction.user.username}`)
            .setDescription(`Aguarde e iremos lhe atender.`)
          const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("close")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger),
            new Discord.ButtonBuilder()
              .setCustomId("help")
              .setEmoji("📞")
              .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
              .setCustomId("pix")
              .setEmoji("<:pix:1147993323282366504>")
              .setStyle(Discord.ButtonStyle.Secondary),
          );

          ch.send({ embeds: [embed], components: [button]})
          interaction.reply({ content: `Seu ticket foi aberto no canal: ${ch}`, ephemeral: true })

        })

      }

    }

  }

  if (interaction.isModalSubmit()) {

    if (interaction.customId === 'verifyModal') {

      const password = interaction.fields.getTextInputValue('passwordInput');
      const user_id = interaction.user.id

      async function handlePasswordInteraction() {

        if (password.toLowerCase() === process.env.PASSWORD.toLowerCase()) {

          const guild = await client.guilds.fetch(process.env.GUILD);
          const member = await guild.members.fetch(user_id);
          const role = await guild.roles.cache.get(process.env.CARGO);

          if (member && role) {
            await member.roles.add(role);
          }

          fs.appendFile(
            './database/ids.txt',
            `${user_id}\n`,
            (error) => {
              if (error) {
                console.error(error);
              }
            }
          );

          interaction.reply({ content: `Você digitou a palavra passe: **${process.env.PASSWORD}** corretamente, seja bem-vindo(a)!`, ephemeral: true });

        } else {
          interaction.reply({ content: `Você digitou a palavra passe: **${process.env.PASSWORD}** errado, tente novamente!`, ephemeral: true });
        }
      }

      handlePasswordInteraction()
    }

    if(interaction.customId === 'supportModal') {

      const questionText = interaction.fields.getTextInputValue('questionInput');

      const channel_name = `❓﹒support﹒${interaction.user.username}`;
      const text_category_id = process.env.TICKETS
      
      if (!interaction.guild.channels.cache.get(text_category_id)) text_category_id = null;

      if (interaction.guild.channels.cache.find(c => c.name === channel_name)) {
        interaction.reply({ content: ` Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === channel_name)}!`, ephemeral: true })
      } else {

        interaction.guild.channels.create({
          name: channel_name,
          type: Discord.ChannelType.GuildText,
          parent: text_category_id,
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
        }).then((ch) => {

          const embed = new Discord.EmbedBuilder()
            .setColor(0x00958F)
            .setTitle(`Bem-vindo ${interaction.user.username}`)
            .setDescription(`Você tem a seguinte dúvida:\n {**${questionText}**}\n Aguarde e iremos lhe atender!`)
          const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("close")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger),
            new Discord.ButtonBuilder()
              .setCustomId("help")
              .setEmoji("📞")
              .setStyle(Discord.ButtonStyle.Primary),
          );

          ch.send({ embeds: [embed], components: [button]})
          interaction.reply({ content: `Seu ticket foi aberto no canal: ${ch}`, ephemeral: true })

        })

      }
    }

    if(interaction.customId === 'orcamentoModal') {

      const ideiaText = interaction.fields.getTextInputValue('ideiaInput');

      const channel_name = `💵﹒orçamento﹒${interaction.user.username}`;
      const text_category_id = process.env.TICKETS
      
      if (!interaction.guild.channels.cache.get(text_category_id)) text_category_id = null;

      if (interaction.guild.channels.cache.find(c => c.name === channel_name)) {
        interaction.reply({ content: ` Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === channel_name)}!`, ephemeral: true })
      } else {

        interaction.guild.channels.create({
          name: channel_name,
          type: Discord.ChannelType.GuildText,
          parent: text_category_id,
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
        }).then((ch) => {

          const embed = new Discord.EmbedBuilder()
            .setColor(0x00958F)
            .setTitle(`Bem-vindo ${interaction.user.username}`)
            .setDescription(`Vamos conversar sobre sua idéia:\n {**${ideiaText}**}\n Aguarde e iremos lhe atender!`)
          const button = new Discord.ActionRowBuilder().addComponents(
            new Discord.ButtonBuilder()
              .setCustomId("close")
              .setEmoji("🔒")
              .setStyle(Discord.ButtonStyle.Danger),
            new Discord.ButtonBuilder()
              .setCustomId("help")
              .setEmoji("📞")
              .setStyle(Discord.ButtonStyle.Primary),
            new Discord.ButtonBuilder()
              .setCustomId("pix")
              .setEmoji("<:pix:1147993323282366504>")
              .setStyle(Discord.ButtonStyle.Secondary),
          );

          ch.send({ embeds: [embed], components: [button]})
          interaction.reply({ content: `Seu ticket foi aberto no canal: ${ch}`, ephemeral: true })

        })

      }
    }

  }

  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === "checker_options") {

      let options = interaction.values[0]

      if (options === "lol") {

        const channel_name = `🗃﹒lol﹒${interaction.user.username}`;
        const text_category_id = process.env.TICKETS
        
        if (!interaction.guild.channels.cache.get(text_category_id)) text_category_id = null;
  
        if (interaction.guild.channels.cache.find(c => c.name === channel_name)) {
          interaction.reply({ content: ` Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === channel_name)}!`, ephemeral: true })
        } else {
  
          interaction.guild.channels.create({
            name: channel_name,
            type: Discord.ChannelType.GuildText,
            parent: text_category_id,
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
          }).then((ch) => {
  
            const embed = new Discord.EmbedBuilder()
              .setColor(0x00958F)
              .setTitle(`Checker - League of Legends`)
              .setDescription(`Por favor, forneça o login e senha da conta que deseja obter os dados e aguarde o atendimento.`)
            const button = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("close")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger),
              new Discord.ButtonBuilder()
                .setCustomId("help")
                .setEmoji("📞")
                .setStyle(Discord.ButtonStyle.Primary),
              new Discord.ButtonBuilder()
                .setCustomId("pix")
                .setEmoji("<:pix:1147993323282366504>")
                .setStyle(Discord.ButtonStyle.Secondary),
            );
            
  
            ch.send({ embeds: [embed], components: [button]})
            interaction.reply({ content: `Seu ticket foi aberto no canal: ${ch}`, ephemeral: true })
  
          })
  
        }

      }

      if (options === "val") {

        const channel_name = `🗃﹒valorant﹒${interaction.user.username}`;
        const text_category_id = process.env.TICKETS
        
        if (!interaction.guild.channels.cache.get(text_category_id)) text_category_id = null;
  
        if (interaction.guild.channels.cache.find(c => c.name === channel_name)) {
          interaction.reply({ content: ` Você já possui um ticket aberto em ${interaction.guild.channels.cache.find(c => c.name === channel_name)}!`, ephemeral: true })
        } else {
  
          interaction.guild.channels.create({
            name: channel_name,
            type: Discord.ChannelType.GuildText,
            parent: text_category_id,
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
          }).then((ch) => {
  
            const embed = new Discord.EmbedBuilder()
              .setColor(0x00958F)
              .setTitle(`Checker - Valorant`)
              .setDescription(`Por favor, forneça o login e senha da conta que deseja obter os dados e aguarde o atendimento.`)
            const button = new Discord.ActionRowBuilder().addComponents(
              new Discord.ButtonBuilder()
                .setCustomId("close")
                .setEmoji("🔒")
                .setStyle(Discord.ButtonStyle.Danger),
              new Discord.ButtonBuilder()
                .setCustomId("help")
                .setEmoji("📞")
                .setStyle(Discord.ButtonStyle.Primary),
              new Discord.ButtonBuilder()
                .setCustomId("pix")
                .setEmoji("<:pix:1147993323282366504>")
                .setStyle(Discord.ButtonStyle.Secondary),
            );
  
            ch.send({ embeds: [embed], components: [button]})
            interaction.reply({ content: `Seu ticket foi aberto no canal: ${ch}`, ephemeral: true })
  
          })
  
        }

      }

    }
  }
  

})

client.login(process.env.TOKEN);

module.exports = client;