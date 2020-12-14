	/*jshint esversion: 6 */
	let Discord = require('discord.js');
	let db = require('quick.db');
	let bot = new Discord.Client();
	let fs = require('fs');
	let userEco = JSON.parse(fs.readFileSync('Storage/userEco.json', 'utf8'));
	bot.commands = new Discord.Collection();
	fs.readdir('./commands/', (err, files) => {
		if(err){
			console.error(err);
		}
		let jsfiles = files.filter(f => f.split('.').pop() === 'js');
		if(jsfiles.length <= 0) { return console.log('No commands found!'); }
		if(jsfiles.length > 0) { console.log(`${jsfiles.length} commands found!`); }
		jsfiles.forEach((f, i) => {
			delete require.cache[require.resolve(`./commands/${f}`)];
			let cmds = require(`./commands/${f}`);
			console.log(`Command ${f} loading...`);
			bot.commands.set(cmds.config.command, cmds);
		});	
	});
	let prefix = '-';
	//let prefix = process.env.prefix;
	let owner = process.env.ownerID;
	bot.on('message', function(message){
		let sender = message.author;
		if((sender.id === '781250071215472640') || (sender.id === '781277535232458763') || (sender.id === '786892385682194442')){
			return;
		}
		if(!userEco[sender.id]){
			userEco[sender.id] = {
			balance: 0 };
		}
		fs.writeFile('Storage/userEco.json', JSON.stringify(userEco), (err) => {
			if(err){
				console.error(err);
			}
		});
		if(!message.content.startsWith(prefix)){
			return;
		}
		let args = message.content.toString().split(' ');
		let input = args[0].toUpperCase();
		let cont = input.slice(prefix.length).split(' ');
		let cmd = bot.commands.get(cont[0]);
		if(!cmd) {
			return;
		}
		cmd.run(bot, message, args, userEco);
	});
	bot.on('ready', function(ready){
		console.log(`Logged in as ${bot.user.tag}!`);
		bot.user.setStatus('Online');
	});
	bot.login('Nzg2ODkyMzg1NjgyMTk0NDQy.X9NApA.hin8RVGoD-ponFJ8__0SibcsJoI');
	//bot.login(process.env.DISCORD_TOKEN);
