const Companies = [
    {
        name: "Dollar Store",
        production: 20,
        price: 5000
    },
    {
        name: "Coffee Shop",
        production: 50,
        price: 15000
    },
    {
        name: "Bakery",
        production: 150,
        price: 30000
    },
    {
        name: "Supermarket",
        production: 300,
        price: 100000
    }
]

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