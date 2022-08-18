const { SlashCommandBuilder } = require('discord.js');

const Account = require('../database/tables/accounts');
const Companies = require('../database/tables/companies');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-account')
		.setDescription('Creates a fresh account! Creating an account is necessary to play with this bot!'),
	async execute(interaction) {

        await Account.create({
            id: interaction.user.id,
            wallet_cash: 0
        })

        await Companies.create({
            id: interaction.user.id,
            dollar_store: 0,
            coffe_shop: 0,
            bakery: 0,
            supermarket: 0
        })

        interaction.reply('Created a new account! Welcome to the game!');

	},
};