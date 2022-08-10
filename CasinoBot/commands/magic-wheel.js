const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('magic-wheel')
		.setDescription('Spin the wheel and try to win!')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color you want to bet on!')
                .setRequired(true)
                .addChoices(
                    { name: 'red', value: 'red' },
                    { name: 'green', value: 'green' },
                    { name: 'blue', value: 'blue' },
                    { name: 'black', value: 'black' },
                    { name: 'orange', value: 'orange' },
                    { name: 'purple', value: 'purple' },
                )),
	async execute(interaction) {
		return interaction.reply(`Roullette! (You picked ${interaction.options.getString('color')})`);
	},
};