const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chucknorris')
		.setDescription('Chuck Norris!'),
	async execute(interaction) {
		let joke;
		await fetch('https://api.chucknorris.io/jokes/random')
			.then(async (response) => {
				await response.json()
					.then((response) => {
						joke = response.value;
					})
			})
		return interaction.reply(`${joke}`);
	},
};