const { SlashCommandBuilder } = require('discord.js');

const Account = require('../database/tables/accounts');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-account')
		.setDescription('Creates a fresh account! Creating an account is necessary to play with this bot!'),
	async execute(interaction) {

        await Account.create({
            id: interaction.user.id,
            wallet_cash: 0
        })

        interaction.reply('Created a new account! Welcome to the game!');

	},
};