const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = [];

const commandsDirectories = [
	path.join(__dirname, 'commands'),
	path.join(__dirname, 'commands/Bank-And-Wallet'),
	path.join(__dirname, 'commands/Casino-Games'),
	path.join(__dirname, 'commands/Daily-Revenue'),
	path.join(__dirname, 'commands/Risky')
];


for(const directory of commandsDirectories){
	commandFiles.push(getFiles(directory));
}

for(let i = 0; i < commandFiles.length; i++){
	for(let b = 0; b < commandFiles[i].length; b++){
		const filePath = path.join(commandsDirectories[i] ,commandFiles[i][b]);
		const command = require(filePath);
		commands.push(command.data.toJSON());
	}
}

function getFiles(dir){

	return fs.readdirSync(dir).filter(file => file.endsWith('.js'));

}

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);