const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('odd-even')
        .setDescription('Odd or even game!')
        .addStringOption(option =>
            option.setName('odd-even')
                .setDescription('Is it gonna be odd or even?')
                .setRequired(true)
                .addChoices(
                    { name: 'Odd', value: 'odd' },
                    { name: 'Even', value: 'even' }))
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('The number you want to add up!')
                .setRequired(true)
                .addChoices(
                    { name: '1', value: 1},
                    { name: '2', value: 2},
                    { name: '3', value: 3},
                    { name: '4', value: 4},
                    { name: '5', value: 5},
                    ))
        .addIntegerOption(option =>
            option.setName('bet')
                .setDescription('The amount of cash you want to bet!')
                .setRequired(true)),
    async execute(interaction) {

        return interaction.reply('Currently implementing this command!');
    },
};