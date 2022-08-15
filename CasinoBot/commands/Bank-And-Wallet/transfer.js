const { SlashCommandBuilder } = require('discord.js');
const Account = require('../../database/tables/accounts');
const fixTag = require('../../utils/fix-tag');

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

        let receiver_id = fixTag(interaction.options.getString('receiver'));

        let receiver = await Account.findOne(
            { where: { id: receiver_id}}
        )

        if(!receiver){
            interaction.reply(`You're trying to send money to an invalid account`);
            return;
        }

        if(sender.dataValues.wallet_cash < amount){
            interaction.reply('You do not have enough money!');
            return;
        }

        let senderNewCash = sender.dataValues.wallet_cash - amount;
        let receiverNewCash = receiver.dataValues.wallet_cash + amount;
            
        await Account.update(
            { wallet_cash: senderNewCash },
            { where: { id: interaction.user.id }}
        )

        await Account.update(
            { wallet_cash: receiverNewCash },
            { where: { id: receiver_id}}
        )

        return interaction.reply(`Transfered ${amount} $ to ${interaction.options.getString('receiver')}`);
    },
};