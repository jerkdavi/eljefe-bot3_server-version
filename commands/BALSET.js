	/*jshint esversion: 6 */
	module.exports.run = async (bot, message, args, userEco) => {
		let fs = require('fs');
		let sender = message.author;
		let prefix = '-';
		//let prefix = process.env.prefix;
		//console.log(`${args[0]}`);
		//console.log(`${args[1]}`);
		//console.log(`${args[2]}`);
		if(!sender.id === '764170607004745739'){
			message.channel.send({embed:{
				description:'You do not have permissions to request the deletion of messages on this server!',
				color:0xD4AF37
			}});
			return;
		}
		if(!args[1]){
			message.channel.send({embed:{
				description:`You need to define an ammount!\nUsage: **${prefix}BALSET <amount> @<user>**.`,
				color:0xD4AF37
			}});
			return;
		}
		if(isNaN(args[1])){
			message.channel.send({embed:{
				description:`The amount has to be a number!\nUsage: **${prefix}BALSET <amount> @<user>**.`,
				color:0xD4AF37
			}});
			return;
		}
		if(Number(args[1]) === 0){
			message.channel.send({embed:{
				description:'The amount cannot be 0!',
				color:0xD4AF37
			}});
			return;
		}
		let definedUser = '';
		if(!args[2]){
			definedUser = message.author;
			//console.log(`${definedUser}`);
		}
		else{
			let firstMentioned = message.mentions.users.first();
			if(firstMentioned === undefined){
				if(args[2].startsWith('@')){
					message.channel.send({embed:{
						description:`You misspelled the user's name!`,
						color:0xD4AF37
					}});
					return;
				}
				message.channel.send({embed:{
					description:`You didn't use the correct call function e.g. @${args[2]}!`,
					color:0xD4AF37
				}});
				return;
			}
			definedUser = firstMentioned;
			//console.log(`${definedUser}`);
		}
		if(!userEco[definedUser.id]){
			message.channel.send({embed:{
				description:`User ${definedUser} is not inicialized!\nThe user needs to send at least one message to this channel so the bot can initialize her/him!`,
				color:0xD4AF37
			}});
			return;
		}
		userEco[definedUser.id].balance +=/* parseInt(args[1]);*/Number(args[1]);
		fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
			if(err){
				console.error(err);
			}
		});
		if(Number(args[1]) > 0){
			message.channel.send({embed:{
				description:`${args[1]} coins have been donated to ${definedUser}!`,
				color:0xD4AF37
			}});
		}
		if(Number(args[1]) < 0){
			message.channel.send({embed:{
				description:`${args[1]} coins have been taken away from ${definedUser}!`,
				color:0xD4AF37
			}});
		}
	}
	module.exports.config = {
		command:'BALSET'
	}
