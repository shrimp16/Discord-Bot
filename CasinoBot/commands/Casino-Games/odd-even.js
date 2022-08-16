const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('odd-even')
        .setDescription('Odd or even game!')
        .addStringOption(option =>
            option.setName('odd-even')
                .setDescription('Is it gonna be odd or even?')
                .setRequired(true))
                .addChoices(
                    { name: 'Odd', value: 'odd' },
                    { name: 'Even', value: 'even' })
        .addIntegerOption(option =>
            option.setName('bet')
                .setDescription('The amount of cash you want to bet!')
                .setRequired(true)),
    async execute(interaction) {
        return interaction.reply('Currently implementing this command!');
    },
};