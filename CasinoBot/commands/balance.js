const { SlashCommandBuilder } = require('discord.js');

const Account = require('../database/tables/accounts');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check the balance of an account!'),
	async execute(interaction) {

        let account = await Account.findOne(
            { where: { id: interaction.user.id } }
        )

        if(!account){
            interaction.reply('Invalid Account!');
            return;
        }

		return interaction.reply(`Balance: ${account.dataValues.cash}$`);
	},
};