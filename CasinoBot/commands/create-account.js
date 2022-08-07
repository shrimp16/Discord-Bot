const { SlashCommandBuilder } = require('discord.js');
const idGenerator = require('../utils/id-generator');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('create-account')
		.setDescription('Creates a fresh account!'),
	async execute(interaction) {
        interaction.reply('Create new account!');
        return interaction.user.send(`Here's your new fresh account: ${idGenerator.getUniqueID()}`);
	},
};