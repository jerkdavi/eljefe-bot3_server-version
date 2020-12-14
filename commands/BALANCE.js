	/*jshint esversion: 6 */
	module.exports.run = async (bot, message, args, userEco) => {
		let definedUser = '';
		if(!args[1]){
			definedUser = message.author;
			//console.log(`${definedUser}`);
		}
		else{
			let firstMentioned = message.mentions.users.first();
			if(firstMentioned === undefined){
				if(args[1].startsWith('@')){
					message.channel.send({embed:{
						description:`You misspelled the user's name!`,
						color:0xD4AF37
					}});
					return
				}
				message.channel.send({embed:{
					description:`You didn't use the correct call function e.g. @${args[1]}!`,
					color:0xD4AF37
				}});
				return
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
		message.channel.send({embed:{
			description:`Account Holder: **${definedUser.username}**\nAccount Balance: **${userEco[definedUser.id].balance}** coins`,
			color:0xD4AF37
		}});
	}
	module.exports.config = {
		command:'BALANCE'
	}
