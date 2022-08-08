const { SlashCommandBuilder } = require('discord.js');

const Account = require('../database/tables/accounts');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check the balance of an account!')
        .addStringOption(option =>
            option.setName('account')
                .setDescription('Insert the account where you want to check the balance.')
                .setRequired(true)),
	async execute(interaction) {

        let account = await Account.findOne(
            { where: { id: interaction.options.getString('account') } }
        )

        if(!account){
            interaction.reply(`Invalid Account!`);
            return;
        }

		return interaction.reply(`Balance: ${account.dataValues.cash}$`);
	},
};