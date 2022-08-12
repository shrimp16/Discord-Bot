const { SlashCommandBuilder } = require('discord.js');

const Account = require('../database/tables/accounts');
const fixTag = require('../utils/fix-tag');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('steal')
		.setDescription('Steal some cash from someone!')
        .addStringOption(option =>
            option.setName('victim')
                .setDescription('The victim of your robbery!')
                .setRequired(true)),
	async execute(interaction) {

        let victim_id = fixTag(interaction.options.getString('victim'));

        let victim = Account.findOne(
            { where: { id: victim_id } }
        )

        if(!victim){
            interaction.reply(`The person you tried to steal isn't playing the game!`)
        }

		return interaction.reply('Pong!');
	},
};