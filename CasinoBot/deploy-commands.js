const fs = require('node:fs');
const path = require('node:path');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

//ARRAY WITH ALL THE PATHS FOR THE FILES//
const commandsDirectories = [
	path.join(__dirname, 'commands'),
	path.join(__dirname, 'commands/Bank-And-Wallet'),
	path.join(__dirname, 'commands/Casino-Games'),
	path.join(__dirname, 'commands/Daily-Revenue'),
	path.join(__dirname, 'commands/Risky')
];

//CREATES AN ARRAY OF ARRAYS WITH ALL THE FILES PATH FROM EACH DIRECTORY//
const commandFiles = [];
for(const directory of commandsDirectories){
	commandFiles.push(getFiles(directory));
}

/*
IT IS THE ALMOST THE SAME AS THE ONE ON THE MAIN FILE BUT THIS ONE ADDS THE COMMANDS DATA
TO AN ARRAY OF COMMANDS AS JSON TO THEN DEPLOY
*/
const commands = [];
//FIRST TRY TO GET THIS LOADER TO WORK//
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