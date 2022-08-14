const { REST } = require('@discordjs/rest');
const { Routes } = require('discord.js');
const { loadToDeploy } = require('./commands-loader');
const { clientId, guildId, token } = require('./config.json');

const rest = new REST({ version: '10' }).setToken(token);

const commands = loadToDeploy();

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);