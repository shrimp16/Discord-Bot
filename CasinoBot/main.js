// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const { loadToBot } = require('./commands-loader');

const database = require('./database/db');

const Account = require('./database/tables/accounts')
const Companies = require('./database/tables/companies')
const BankAccount = require('./database/tables/bank-accounts');
const CompaniesRevenue = require('./database/tables/companies-revenue');
const DailyClaim = require('./database/tables/daily-claims');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = loadToBot();

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