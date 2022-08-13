// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const database = require('./database/db');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const commandsDirectories = [
	path.join(__dirname, 'commands'),
	path.join(__dirname, 'commands/Bank-And-Wallet'),
	path.join(__dirname, 'commands/Casino-Games'),
	path.join(__dirname, 'commands/Daily-Revenue'),
	path.join(__dirname, 'commands/Risky')
];

const commandFiles = [];

for(const directory of commandsDirectories){
	commandFiles.push(fs.readdirSync(directory).filter(file => file.endsWith('.js')));
}

console.log(commandFiles);

//const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.commands = new Collection();

for(let i = 0; i < commandFiles.length; i++){
	for(let b = 0; b < commandFiles[i].length; b++){
		const filePath = path.join(commandsDirectories[i] ,commandFiles[i][b]);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
}

/*for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);

}*/

console.log(client.commands);

//keeping this here just in case I need to reset the database
/*
(async () => {
    await database.sync({ force: true });
})();
*/

// When the client is ready, run this code (only once)
client.on('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    console.log(command);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Something went wrong!', ephemeral: true });
    }

});

// Login to Discord with your client's token
client.login(token);