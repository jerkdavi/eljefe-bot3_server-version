	/*jshint esversion: 6 */
	//console.log('Step 300');
	module.exports.run = async (bot, message, args, userEco) => {
		//console.log('Step 301');
		message.channel.send({embed:{
			description:`Ping successful! The bot ${bot.user.tag}! is online!`,
			color:0xD4AF37
		}});
		//console.log('Step 302');
	}
	//console.log('Step 303');
	module.exports.config = {
		command:'PING'
	}
