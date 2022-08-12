const { SlashCommandBuilder } = require('discord.js');
const Account = require('../database/tables/accounts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transfer')
        .setDescription('Transfer cash from an account to another!')
        .addStringOption(option =>
            option.setName('receiver')
                .setDescription('Insert the person that will recieve the cash')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Insert the amount of cash you want to transfer.')
                .setRequired(true)),
    async execute(interaction) {

        let amount = interaction.options.getInteger('amount');

        let sender = await Account.findOne(
            { where: { id: interaction.user.id }}
        )

        let receiver = await Account.findOne(
            { where: { id: interaction.options.getString('receiver')}}
        )

        if(!receiver){
            interaction.reply(`You're trying to send money to an invalid account`);
            return;
        }

        if(sender.dataValues.cash < amount){
            interaction.reply('You do not have enough money!');
            return;
        }

        let senderNewCash = firstAccount.dataValues.cash - amount;
        let receiverNewCash = secondAccount.dataValues.cash + amount;
            
        await Account.update(
            { cash: senderNewCash },
            { where: { id: interaction.user.id }}
        )

        await Account.update(
            { cash: receiverNewCash },
            { where: { id: interaction.options.getString('receiver')}}
        )

        return interaction.reply(`Transfered ${amount} to ${interaction.options.getString('receiver')}`);
    },
};

function fixTag(tag){
    return tag.substring(0, tag.length - 1);
}