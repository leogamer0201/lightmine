const Discord = require('discord.js')

var bot = new Discord.Client()

const TOKEN = process.env.BOT_TOKEN

bot.on("message", function(message) {

    bot.user.setActivity(`LightMine loja de minecraft!`, {type: "WATCHING"});
           
});

    bot.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;

        let prefix = '!'
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

 if (command == `${prefix}ajuda`) {
			
			message.channel.send(message.author + '**, Enviei meus comandos na sua dm.**')
			
			const h1 = new Discord.RichEmbed()
			.addField('Comandos Públicos:', '!serverinfo - Mostra as informações do servidor\n!reportar - Reporta um usuário para a Staff')
			.setColor('#ff7a00')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			
			const h2 = new Discord.RichEmbed()
			.addField('Comandos para Moderação:', '!ban - Bane o usuário do servidor(Banir Membros)\n!kick - Expulsa o usuário do servidor(Expulsar Membros)')
			.setColor('#ff1800')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			
			const h3 = new Discord.RichEmbed()
			.addField('Outros Comandos:', '!anunciar - Faz um anúncio no canal #anuncios(Gerenciar Canais)')
			.setColor('#00ff01')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
	
			  try{
    await message.author.send(h1)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`${message.author}**, Habilite o Dm para eu enviar os comandos.**`)
  }
		
		  try{
    await message.author.send(h2)
  }catch(e){
    console.log(e.stack);
  }
		
				  try{
    await message.author.send(h3)
  }catch(e){
    console.log(e.stack);
  }


        if (command == `${prefix}serverinfo`) {
            const embed = new Discord.RichEmbed()
         .addField(':computer: Id do servidor', message.guild.id)
        .setColor(0x00FFFF)
        .addField(':hammer: Criadores do bot', '`Harry#6281`')
        .addField(':newspaper: Seu Cargo', message.member.highestRole.name)
        .addField(':tophat: Criador do servidor', message.guild.owner)
        .addField(':earth_americas:   Região do servidor', message.guild.region)
        .addField(`:speech_balloon: Canais (${message.guild.channels.size})`, `:pencil: Texto: ${message.guild.channels.filter(m => m.type === 'text').size}\n:loud_sound: Voz: ${message.guild.channels.filter(m => m.type === 'voice').size}`)
        .addField(':book: Servidor criado em', message.guild.createdAt)
        .addField(':balloon: Entrei aqui em', message.guild.joinedAt)
        .addField(':busts_in_silhouette:  Membros', `${message.guild.memberCount}`)
        .setThumbnail(message.guild.iconURL)
        message.channel.send(embed)
}

if (command == `${prefix}anunciar`) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Você não tem permissão para utilizar este comando!** :x:`);
    let anuncio = args.join(" ");
    message.delete();

    const embed = new Discord.RichEmbed()
    .addField(" Anúncio ", anuncio)
    .setColor('#19a338')
    .addField("Atenciosamente,", message.author)

    let anunciochannel = message.guild.channels.find(`name`, 'anuncios')

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
        
                if (command == `${prefix}reportar`) {
                   let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!rUser) return message.channel.send(`**Mencione o usuário!** :x:`);
          if(rUser.id === message.author.id) return message.channel.send(`**Você não pode se Reportar!** :x:`)
          let rreason = args.join(" ").slice(22);
          if(!rreason) return message.channel.send(`**Coloque a razão do Report!** :x:`)
          message.delete();
      
          let reportEmbed = new Discord.RichEmbed()
        .setTitle(`LightMine`)
        .addField('Usuário Reportado', rUser)
        .addField('Reportado pelo', message.author)
        .addField('Razão', rreason)
          .setColor("#54eb12")
          .setThumbnail(message.author.avatarURL)
          .setFooter(`LightReport`)
      
          let reportschannel = message.guild.channels.find(`name`, 'reportes');
          if(!reportschannel) return message.channel.send(`O canal **reportes** não existe. :x:`);

          message.channel.send(`**Usuário reportado com sucesso.**`)
      
          message.delete().catch(O_o=>{});
          reportschannel.send(reportEmbed);
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

    });
bot.login(TOKEN);
