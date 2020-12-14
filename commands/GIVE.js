	/*jshint esversion: 6 */
	module.exports.run = async (bot, message, args, userEco) => {
		let fs = require('fs');
		let sender = message.author;
		let prefix = '-';
		//let prefix = process.env.prefix;
		console.log(`${sender.id}`)
		if(!args[1]){
			message.channel.send({embed:{
				description:`You need to define an ammount!\nUsage: **${prefix}GIVE <amount> @<user>**.`,
				color:0xD4AF37
			}});
			return;
		}
		if(isNaN(args[1])){
			message.channel.send({embed:{
				description:`The amount has to be a number!\nUsage: **${prefix}GIVE <amount> @<user>**.`,
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
			message.channel.send({embed:{
				description:'Who are you giving the money to dummy?!',
				color:0xD4AF37
			}});
			return;
		}
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
		console.log(`${definedUser.id}`);
		if(sender.id === definedUser.id){
			message.channel.send({embed:{
				description:'You cannot give the money to yourself dummy?!',
				color:0xD4AF37
			}});
			return;
		}
		if(userEco[sender.id].balance === 0){
			message.channel.send({embed:{
				description:'The idea is a noble one, but you have **no money to give**!',
				color:0xD4AF37
			}});
			return;
		}
		if(Number(args[1]) > userEco[sender.id].balance)
		{
			message.channel.send({embed:{
				description:'You don\'t have that much money to give!',
				color:0xD4AF37
			}});
			return;
		}
		if(Number(args[1]) === userEco[sender.id].balance)
		{
			message.channel.send({embed:{
				description:`You decide to give all **${userEco[sender.id].balance} coins** you have to ${definedUser}!`,
				color:0xD4AF37
			}});
			userEco[sender.id].balance = 0;
			userEco[definedUser.id].balance += Number(args[1]);
			fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
				if(err){
					console.error(err);
				}
			});
			return;
		}
		if(Number(args[1])< userEco[sender.id].balance)
		{
			message.channel.send({embed:{
				description:`You decide to give **${args[1]} coins** to ${definedUser}!`,
				color:0xD4AF37
			}});
			userEco[sender.id].balance -= Number(args[1]);
			userEco[definedUser.id].balance += Number(args[1]);
			fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
				if(err){
					console.error(err);
				}
			});
			return;
		}
	}
	module.exports.config = {
		command:'GIVE'
	}
