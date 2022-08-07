const { SlashCommandBuilder } = require('discord.js');

const Account = require('../database/tables/accounts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily-bonus')
        .setDescription('Collect your daily bonus!')
        .addStringOption(option =>
            option.setName('account')
                .setDescription('Insert the account where you want to recieve the bonus.')
                .setRequired(true)),
    async execute(interaction) {

        let account = await Account.findOne(
            { where: { id: interaction.options.getString('account') }}
        )

        let currentCash = account.dataValues.cash;

        currentCash += 50;

        await Account.update(
            { cash: currentCash },
            { where: { id: interaction.options.getString('account') } }
        )

        return interaction.reply(`Claimed daily bonus! Current balance: ${currentCash}$`);

    },
};