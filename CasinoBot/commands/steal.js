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

        console.log(interaction.user.id);

        let stealer = await Account.findOne(
            { where: { id: interaction.user.id } }
        )

        console.log(interaction.options);

        let victim_id = fixTag(interaction.options.getString('victim'));

        let victim = await Account.findOne(
            { where: { id: victim_id } }
        )

        if(!victim){
            interaction.reply(`The person you tried to steal isn't playing the game!`);
            return;
        }

        let stealResult = Math.floor(Math.random() * 100);

        if(stealResult <= 50){
            let stealCash = Math.floor(Math.random() * stealer.dataValues.cash);
            interaction.reply(`${interaction.options.getString('victim')} outplayed you and stole ${stealCash} $ from you instead!`);
        } else {
            let stealCash = Math.floor(Math.random() * victim.dataValues.cash);
            interaction.reply(`You stole ${stealCash} $ from ${interaction.options.getString('victim')}`);
        }

	},
};