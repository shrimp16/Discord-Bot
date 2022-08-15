const { SlashCommandBuilder } = require('discord.js');

const { getDays } = require('../../utils/time-manager');

const Account = require('../../database/tables/accounts');
const DailyClaim = require('../../database/tables/daily-claims');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily-bonus')
        .setDescription('Collect your daily bonus!'),
    async execute(interaction) {

        let account = await Account.findOne(
            { where: { id: interaction.user.id } }
        )

        if (!account) {
            interaction.reply('Invalid Account!');
            return;
        }

        let claim = await DailyClaim.findOne(
            { where: { user_id: interaction.user.id } }
        )

        if (!claim) {
            await DailyClaim.create({
                user_id: interaction.user.id,
                last_claim: new Date().getTime()
            })
            claimBonus(account, interaction);
            return;
        }

        let now = new Date().getTime();
        let then = new Date(claim.dataValues.updatedAt).getTime();

        const diffTime = Math.abs(now - then);

        const diffDays = getDays(diffTime);

        if (diffDays <= 1) {
            interaction.reply(`You already claimed your daily bonus!`);
            return;
        }

        claimBonus(account, interaction);

    },
};

async function claimBonus(account, interaction) {

    let currentCash = account.dataValues.wallet_cash;

    currentCash += 50;
    
    await Account.update(
        { wallet_cash: currentCash },
        { where: { id: interaction.user.id } }
    )

    interaction.reply('Claimed daily bonus! /balance to check your balance!');

}