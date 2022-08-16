const { SlashCommandBuilder } = require('discord.js');

const Account = require('../../database/tables/accounts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check the balance of an account!')
        .addStringOption(option =>
            option.setName('account')
                .setDescription('Do you want to check your balance on your wallet or on the bank?')
                .setRequired(true)
                .addChoices(
                    { name: 'Wallet 👛', value: 'wallet' },
                    { name: 'Bank 🏦', value: 'bank' }
                )),
    async execute(interaction) {

        if (interaction.options.getString('account') === 'wallet') {

            let account = await Account.findOne(
                { where: { id: interaction.user.id } }
            )
    
            if (!account) {
                interaction.reply('Invalid Account!');
                return;
            }

            interaction.reply(`Balance: ${account.dataValues.wallet_cash} $`);

            return;
        }
        
    },
};