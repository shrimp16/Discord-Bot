const { SlashCommandBuilder } = require('discord.js');

const Account = require('../../database/tables/accounts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check the balance of an account!')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color you want to bet on!')
                .setRequired(true)
                .addChoices(
                    { name: 'Wallet 👛', value: 'wallet' },
                    { name: 'Bank 🏦', value: 'bank' }
                )),
	async execute(interaction) {

        let account = await Account.findOne(
            { where: { id: interaction.user.id } }
        )

        if (!account) {
            interaction.reply('Invalid Account!');
            return;
        }

        return interaction.reply(`Balance: ${account.dataValues.wallet_cash} $`);
    },
};