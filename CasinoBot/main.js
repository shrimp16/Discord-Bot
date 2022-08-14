// Require the necessary discord.js classes
const { Client, Collection, GatewayIntentBits, ClientUser } = require('discord.js');
const { token } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');

const database = require('./database/db');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

//ARRAY WITH ALL THE PATHS FOR THE FILES//
const commandsDirectories = [
	path.join(__dirname, 'commands'),
	path.join(__dirname, 'commands/Bank-And-Wallet'),
	path.join(__dirname, 'commands/Casino-Games'),
	path.join(__dirname, 'commands/Daily-Revenue'),
	path.join(__dirname, 'commands/Risky')
];

//INSTEAD OF HAVING AN ARRAY, A SIMPLE VARIABLE IS ENOUGH IN CASE THERE'S ONLY ONE DIRECTORY FOR ALL THE COMMANDS//
//const commandsPath = path.join(__dirname, 'commands');

//CREATES AN ARRAY OF ARRAYS WITH ALL THE FILES PATH FROM EACH DIRECTORY//
const commandFiles = [];
for(const directory of commandsDirectories){
	commandFiles.push(fs.readdirSync(directory).filter(file => file.endsWith('.js')));
}

//THIS IS THE WAY TO CREATE THE ARRAY WITH ALL THE FILES PATH WITH ONLY ONE DIRECTORY//
//const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

/*
IT IS THE ALMOST THE SAME AS THE ONE ON THE DEPLOY COMMANDS FILE BUT THIS ONE ADDS THE COMMANDS DATA//
TO A COLLECTION FOR THE USERS TO INVOKE
*/
client.commands = new Collection();
//FIRST TRY TO GET THIS LOADER TO WORK//
/*for(let i = 0; i < commandFiles.length; i++){
	for(let b = 0; b < commandFiles[i].length; b++){
		const filePath = path.join(commandsDirectories[i], commandFiles[i][b]);
		const command = require(filePath);
		client.commands.set(command.data.name, command);
	}
}*/

//SOME EXPERIMENTS WITH FUNCTIONAL PROGRAMMING TO LOAD THE COMMANDS//
let pointer = 0;

commandFiles.forEach(commands => {
    commands.forEach(command => {
        const filePath = path.join(commandsDirectories[pointer], command);
        const commandCode = require(filePath);
        client.commands.set(commandCode.data.name, commandCode);
    });
    pointer++;
})

//OLD WAY THAT WORKS WHEN ALL THE COMMAND FILES ARE ON THE SAME DIRECTORY//
/*for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    client.commands.set(command.data.name, command);

}*/

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