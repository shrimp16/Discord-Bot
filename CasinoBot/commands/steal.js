const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('steal')
		.setDescription('Steal some cash from someone!')
        .addStringOption(option =>
            option.setName('victim')
                .setDescription('The victim of your robbery!')
                .setRequired(true)),
	async execute(interaction) {
		return interaction.reply('Pong!');
	},
};