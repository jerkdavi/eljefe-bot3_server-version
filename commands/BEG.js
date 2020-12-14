	/*jshint esversion: 6 */
	module.exports.run = async (bot, message, args, userEco) => {
		let fs = require('fs');
		let sender = message.author;
		let howyesno = Math.floor(Math.random() * 3);
		console.log(`howyesno: ${howyesno}`);
		if(howyesno === 0){
			message.channel.send({embed:{
				description:'You stand around for **hours** begging, but you don\'t get a **single dime**!',
				color:0xD4AF37
			}});
			return;
		}
		if(howyesno === 1){
			let randnumb = Math.floor(Math.random() * 4);
			console.log(`randnumb: ${randnumb}`);
			if(randnumb === 0){
				message.channel.send({embed:{
					description:'You stand there begging, and a kind stranger comes to you, but since she/he manages to find **nothing** in his wallet, she/he just **smiles at you** and leaves!',
					color:0xD4AF37
				}});
				return;
			}
			message.channel.send({embed:{
				description:`You stand there begging, and a kind stranger comes to you a gives you **${randnumb} coins**!`,
				color:0xD4AF37
			}});
			userEco[sender.id].balance += randnumb;
			fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
				if(err){
					console.error(err);
				}
			});
			return;
		}
		if(howyesno === 2){
			let randnumb = Math.floor(Math.random() * 4);
			console.log(`randnumb: ${randnumb}`);
			if(userEco[sender.id].balance === 0)
			{
				message.channel.send({embed:{
					description:'A bully comes to you and wants to **steal** from you, but since **you\'ve got nothing** she/he decides to leave you alone!',
					color:0xD4AF37
				}});
				return;
			}
			if(userEco[sender.id].balance <= randnumb)
			{
				message.channel.send({embed:{
					description:`A bully comes to you and steals all **${userEco[sender.id].balance} coins** you have!`,
					color:0xD4AF37
					}});
				userEco[sender.id].balance = 0;
				fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
					if(err){
						console.error(err);
					}
				});
				return;
			}
			if(userEco[sender.id].balance > randnumb)
			{
				if(randnumb === 0){
					message.channel.send({embed:{
						description:'You spot a bully from a distance, and manage to **run away** from her/him before she/he steals **anything** from you!',
						color:0xD4AF37
					}});
					return;
				}
				message.channel.send({embed:{
					description:`A bully comes to you and steals **${randnumb} coins** from you!`,
					color:0xD4AF37
				}});
				userEco[sender.id].balance -= randnumb;
				fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
					if(err){
						console.error(err);
					}
				});
				return;
			}
		}
	}
	module.exports.config = {
		command:'BEG'
	}
