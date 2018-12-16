const Discord = require('discord.js')

var bot = new Discord.Client()

const TOKEN = process.env.BOT_TOKEN

bot.on('ready', () => {

  console.log(`📡 Estou conectado a: ${bot.users.size} usuários.`)
  let games = [`📡 Estou conectado a ` + bot.users.size + ` Usuários conectados no total`,
      `🇧🇷 Sou o bot oficial do servidor Mundo SUrvival`, `😛 Minha prefix e !`, `🤔 Compre vip em nosso site: (em breve)`];
  setInterval(() => {
      bot.user.setActivity(games[Math.floor(Math.random() * games.length)], { url: "https://twitch.tv/redstoneg4", type: "STREAMING" })

  }, 20000);
});

   bot.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        let prefix = '!'
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

if (command == `${prefix}anunciar`) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Você não tem permissão para utilizar este comando!** :x:`);
    let anuncio = args.join(" ");
    message.delete();

    const embed = new Discord.RichEmbed()
    .addField(" Anúncio ", anuncio)
    .setColor('#19a338')
    .addField("Atenciosamente,", message.author)

    let anunciochannel = message.guild.channels.find(`name`, '🚨avisos🚨')

    message.channel.send(`**Anuncio feito com sucesso.**`)

    anunciochannel.send("@everyone")
    anunciochannel.send(embed);
  }

  if (command == `${prefix}ban`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`**Você não tem permissão para utilizar esse comando!** :x:`);
    let staff = message.author
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(`${staff}**, Mencione o usuário!** :x:`);
      if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("**Você não pode banir alguém com Administrador!** :x:");
    if(bUser.id === message.author.id) return message.channel.send(`**Você não pode se banir!** :x:`)
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.channel.send(`**Coloque uma razão para poder banir este usuário!** :x:`)
    message.delete();
              message.guild.member(bUser).ban(`Staff ${message.author.username}\n Motivo: ${bReason}`);

    let banEmbed = new Discord.RichEmbed()
    .setTitle(`LightMine`)
    .addField('Usuario banido:', bUser)
    .addField('Staff:', message.author)
    .addField('Razão:', bReason, true)
    .setColor("#ff0000")
    .setThumbnail(message.author.avatarURL)
    .setFooter(`Equipe de Moderação`)


    const embed = new Discord.RichEmbed()
    .setFooter(`Equipe de Moderação`)
    .setTitle(`Você foi Banido do ${message.guild.name}!`)
    .addField("Staff:", `${message.author.username}`)
    .addField("Razão:", bReason)
    .setColor("#ff0000")

    try{
      await bUser.send(embed)
    }catch(e){
    }

    let incidentchannel = message.guild.channels.find(`name`, 'punicoes');
    message.channel.send(`**Usuário banido com sucesso!**`)

    incidentchannel.send(banEmbed);
}
        
                if (command == `${prefix}kick`) {
          if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(`**Você não tem permissão para utilizar esse comando!** :x:`);
          let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!kUser) return message.channel.send(`**Mencione o usuário!** :x:`);
		 if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("**Você não pode expulsar alguém que tem Administrador.** :x:");
          if(kUser.id === message.author.id) return message.channel.send(`**Você não pode se Expulsar!** :x:`)
         
          let kReason = args.join(" ").slice(22);
          if(!kReason) return message.channel.send(`**Coloque a razão do kick!** :x:`)
	  message.delete();
      
          const embed = new Discord.RichEmbed()
          .setFooter(`Equipe de Moderação`)
          .setTitle(`Você foi Expulso do ${message.guild.name}!`)
          .addField(" Pelo Staff", `${message.author.username}`)
          .addField(" Razão", kReason)
          .setColor("#0c8109")
    
          try{
            await kUser.send(embed)
          }catch(e){
          }

          let kickEmbed = new Discord.RichEmbed()
          .setTitle(`LightMine`)
        .addField('Usuário Expulso', kUser)
        .addField(' Pelo Staff', message.author)
        .addField(' Razão', kReason)
          .setFooter(`Equipe de Moderação`)
          .setThumbnail(message.author.avatarURL)
          .setColor("#e56b00")

          message.guild.member(kUser).kick(`Expulso pelo ${message.author.username} - Motivo: ${kReason}`);

          let kickchannel = message.guild.channels.find(`name`, 'punicoes');

          message.channel.send(`**Usuário expulso com sucesso.**`)

          kickchannel.send(kickEmbed);
        }

    bot.on('guildMemberAdd', member => {
      let avatar = member.user.avatarURL

      let embed = new Discord.RichEmbed()
          .setColor('#CC0000')
          .setThumbnail(avatar)
          .addField('Bem vindo ao discord.', `Bem vindo(a) ${member} ao discord oficial da Light NetWork!\n Você foi o __${member.guild.memberCount}__ player a entrar em nosso servidor\n \nPara interagir com os player vá em: #📃chat-geral\nPara ver os nossos anúncios vá em: #⛔avisos⛔\n \nAcesse já o site do servidor: https://lightmine.tk/`)
          .setFooter(`Light NetWork`);
          bot.channels.get('507293636036395008').send(embed);
    })

if (command == `${prefix}limpar`) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado`);
  if(!message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Gerenciar Mensagens`")

      // We want to check if the argument is a number
      if (isNaN(args[0])) {
          // Sends a message to the channel.
          message.channel.send('Coloque um número de 1 á 100! Para poder apagar as mensagens!'); //\n means new line.
          // Cancels out of the script, so the rest doesn't run.
          return;
      }

      const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
      console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

      // Deleting the messages
      message.channel.bulkDelete(fetched)

.catch(error => message.reply(`Eu não consegui deletar mensagens por: ${error}`));
message.channel.send(`:white_check_mark: I ${message.author}, Chat limpo!`)
}

                if (command == `${prefix}reportar`) {
                   let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!rUser) return message.channel.send(`**Mencione o usuário!** :x:`);
          if(rUser.id === message.author.id) return message.channel.send(`**Você não pode se Reportar!** :x:`)
          let rreason = args.join(" ").slice(22);
          if(!rreason) return message.channel.send(`**Coloque a razão do Report!** :x:`)
          message.delete();
      
          let reportEmbed = new Discord.RichEmbed()
        .setTitle(`Mundo Survival`)
        .addField('Usuário Reportado', rUser)
        .addField('Reportado pelo', message.author)
        .addField('Razão', rreason)
          .setColor("#54eb12")
          .setThumbnail(message.author.avatarURL)
          .setFooter(`MsReport`)
      
          let reportschannel = message.guild.channels.find(`name`, 'reportes');
          if(!reportschannel) return message.channel.send(`:x: Erro: O canal **reportes** não existe.`);

          message.channel.send(`**Usuário reportado com sucesso.**`)
      
          message.delete().catch(O_o=>{});
          reportschannel.send(reportEmbed);
        } 

    });
bot.login(TOKEN);
