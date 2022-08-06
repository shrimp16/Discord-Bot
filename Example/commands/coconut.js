const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coconut')
        .setDescription('Replies with Pong!')
        .addStringOption(option =>
            option.setName('user')
                .setDescription('throw a coconut at that user')
                .setRequired(true)),
    async execute(interaction) {
        return interaction.reply(`<@${interaction.user.id}> threw a coconut at ${interaction.options.getString('user')}!`);
    },
};