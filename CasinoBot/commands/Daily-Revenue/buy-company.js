const { CompaniesDetails } = require('./companies-details.json');

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('buy-company')
		.setDescription('Buy a company to get passive income!')
        .addStringOption(option => 
            option.setName('company')
            .setDescription('The company you want to buy!')
            .setRequired(true)
            .addChoices(
                { name: 'Dollar Store', value: 'Dollar Store' },
                { name: 'Coffee Shop', value: 'Coffee Shop' },
                { name: 'Bakery', value: 'Bakery' },
                { name: 'Supermarket', value: 'Supermarket' }
            )),
	async execute(interaction) {
		return interaction.reply('Still in development!');
	},
};