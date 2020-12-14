	/*jshint esversion: 6 */
	//console.log('Step 300');
	module.exports.run = async (bot, message, args, userEco) => {
		let fs = require('fs');
		let sender = message.author;
		let owner = process.env.ownerID;
		if(!(sender.id === owner)){
			message.channel.send({embed:{
				description:'You do not have permissions to request the balance of all users on this server!',
				color:0xD4AF37
			}});
			return;
		}
		fs.readFile('Storage/userEco.json', (err, data) => {
			if(err){ console.error(err); }
			let userEcoall = JSON.stringify(JSON.parse(data), null, 2);
			message.channel.send(userEcoall);
			console.log(userEcoall)
		});
	}
	module.exports.config = {
		command:'BALALL'
	}
