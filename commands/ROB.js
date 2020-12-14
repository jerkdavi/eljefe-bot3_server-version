	/*jshint esversion: 6 */
	//console.log('Step 300');
	module.exports.run = async (bot, message, args, userEco) => {
		let fs = require('fs');
		let sender = message.author;
		console.log(`${sender.id}`)
		let definedUser = '';
		if(!args[1]){
			message.channel.send({embed:{
				description:'Who are you robbing dummy?!',
				color:0xD4AF37
			}});
			return;
		}
		let firstMentioned = message.mentions.users.first();
		if(firstMentioned === undefined){
			if(args[1].startsWith('@')){
				message.channel.send({embed:{
					description:`You misspelled the user's name!`,
					color:0xD4AF37
				}});
				return;
			}
			message.channel.send({embed:{
				description:`You didn't use the correct call function e.g. @${args[1]}!`,
				color:0xD4AF37
			}});
			return;
		}
		definedUser = firstMentioned;
		console.log(`${definedUser.id}`);
		if(sender.id === definedUser.id){
			message.channel.send({embed:{
				description:'You cannot rob from yourself dummy?!',
				color:0xD4AF37
			}});
			return;
		}
		let howyesno = Math.floor(Math.random() * 3);
		console.log(`howyesno: ${howyesno}`);
		if(howyesno === 0){
			message.channel.send({embed:{
				description:`You tried to steal from ${definedUser}, but managed to steal **nothing** and return home **repented** and **empty handed**!`,
				color:0xD4AF37
			}});
			return;
		}
		if(howyesno === 1){
			let randnumb = Math.floor(Math.random() * 4);
			console.log(`randnumb: ${randnumb}`);
			if(randnumb === 0){
				message.channel.send({embed:{
					description:`You stuck your hand in ${definedUser}'s wallet, and as soon as you started to pull something out, she/he disappeared from your sight!`,
					color:0xD4AF37
				}});
				return;
			}
			if(userEco[definedUser.id].balance === 0)
			{
				message.channel.send({embed:{
					description:`You managed to get a hang of ${definedUser}'s wallet, but when you looked inside and saw that she/he has nothing, you returned it to her/him!`,
					color:0xD4AF37
				}});
				return;
			}
			if(userEco[definedUser.id].balance <= randnumb)
			{
				message.channel.send({embed:{
					description:`You managed to get a hang of ${definedUser}'s wallet}, and steal all **${userEco[definedUser.id].balance} coins** she/he had!`,
					color:0xD4AF37
				}});
				let moneystolen = userEco[definedUser.id].balance;
				userEco[definedUser.id].balance = 0;
				userEco[sender.id].balance += Number(moneystolen);
				fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
					if(err){
						console.error(err);
					}
				});
				return;
			}
			if(userEco[definedUser.id].balance > randnumb)
			{
				message.channel.send({embed:{
					description:`You managed to get a hang of ${definedUser}'s wallet}, and steal **${randnumb} coins** from her/him!`,
					color:0xD4AF37
				}});
				userEco[definedUser.id].balance -= Number(randnumb);
				userEco[sender.id].balance += Number(randnumb);
				fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
					if(err){
						console.error(err);
					}
				});
				return;
			}
		}
		if(howyesno === 2){
			let randnumb = Math.floor(Math.random() * 4);
			console.log(`randnumb: ${randnumb}`);
			if(randnumb === 0){
				message.channel.send({embed:{
					description:`${definedUser} saw through your intentions, and the both of you did nothing, exchanged confused looks and just walked past one another!`,
					color:0xD4AF37
				}});
				return;
			}
			if(userEco[sender.id].balance === 0)
			{
				message.channel.send({embed:{
					description:`${definedUser} saw through your intentions, and wanted to steal from you, but since **you\'ve got nothing** she/he just patted you on the back!!`,
					color:0xD4AF37
				}});
				return;
			}
			if(userEco[sender.id].balance <= randnumb)
			{
				message.channel.send({embed:{
					description:`${definedUser} saw through your intentions, and stole all **${userEco[sender.id].balance} coins** you had!`,
					color:0xD4AF37
				}});
				let moneystolen = userEco[sender.id].balance;
				userEco[sender.id].balance = 0;
				userEco[definedUser.id].balance += Number(moneystolen);
				fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
					if(err){
						console.error(err);
					}
				});
				return;
			}
			if(userEco[sender.id].balance > randnumb)
			{
				message.channel.send({embed:{
					description:`${definedUser} saw through your intentions, and stole **${randnumb} coins** from you!`,
					color:0xD4AF37
				}});
				userEco[sender.id].balance -= Number(randnumb);
				userEco[definedUser.id].balance += Number(randnumb);
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
		command:'ROB'
	}
