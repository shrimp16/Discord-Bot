const { SlashCommandBuilder, InteractionResponse } = require('discord.js');

const Account = require('../database/tables/accounts');
const DailyClaim = require('../database/tables/daily-claims');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily-bonus')
        .setDescription('Collect your daily bonus!')
        /*.addStringOption(option =>
            option.setName('account')
                .setDescription('Insert the account where you want to recieve the bonus.')
                .setRequired(true))*/,
    async execute(interaction) {

        let account = await Account.findOne(
            { where: { id: interaction.user.id } }
        )

        if (!account) {
            interaction.reply('Invalid Account!');
            return;
        }

        let claim = await DailyClaim.findOne(
            { where: { user: interaction.user.id } }
        )

        if (!claim) {
            await DailyClaim.create({
                user: interaction.user.id
            })
            claimBonus(account, interaction);
            return;
        }

        let now = new Date().getTime();
        let then = new Date(claim.dataValues.updatedAt).getTime();

        const diffTime = Math.abs(now - then);
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays <= 1) {
            interaction.reply(`You already claimed your daily bonus!`);
            return;
        }

        claimBonus(account, interaction);

    },
};

async function claimBonus(account, interaction) {

    let currentCash = account.dataValues.cash;

    currentCash += 50;

    await Account.update(
        { cash: currentCash },
        { where: { id: interaction.user.id } }
    )

    interaction.reply('Claimed daily bonus! /balance to check your balance!');

}