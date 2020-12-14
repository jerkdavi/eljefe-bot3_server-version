	/*jshint esversion: 6 */
	//console.log('Step 200');
	module.exports.run = async (bot, message, args, userEco) => {
		//console.log('Step 201');
		let fs = require('fs');
		//console.log('Step 202');
		let commandsList = fs.readFileSync('Storage/commands.txt', 'utf8');
		//console.log('Step 203');
		message.channel.send({embed:{
			description:commandsList,
			color:0xD4AF37
		}});
		//console.log('Step 204');
	}
	//console.log('Step 205');
	module.exports.config = {
		command:'HELP'
	}
