const CompaniesDetails = {
    'Dollar Store': {
        price: 5000,
        production: 20
    },
    'Coffee Shop': {
        price: 15000,
        production: 20
    },
    'Bakery': {
        price: 30000,
        production: 150
    },
    'Supermarket': {
        price: 100000,
        production: 300
    }
}

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