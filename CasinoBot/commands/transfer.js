const { SlashCommandBuilder } = require('discord.js');
const Account = require('../database/tables/accounts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('transfer')
        .setDescription('Transfer cash from an account to another!')
        .addStringOption(option =>
            option.setName('first-account')
                .setDescription('Insert the account that will send the cash.')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('second-account')
                .setDescription('Insert the account that will receive the cash.')
                .setRequired(true))
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Insert the amount of cash you want to transfer.')
                .setRequired(true)),
    async execute(interaction) {

        let amount = interaction.options.getInteger('amount');

        if(interaction.options.getString('first-account') === interaction.options.getString('second-account')){
            interaction.reply('It has to be two different accounts!');
            return;
        }

        let firstAccount = await Account.findOne(
            { where: { id: interaction.options.getString('first-account')}}
        )

        if(!firstAccount){
            interaction.reply('The first account is invalid!');
            return;
        }

        if(firstAccount.dataValues.cash < amount){
            interaction.reply('You do not have enough money!');
            return;
        }

        let secondAccount = await Account.findOne(
            { where: { id: interaction.options.getString('second-account')}}
        )

        if(!secondAccount){
            interaction.reply('The second account is invalid!');
            return;
        }


        let firstAccountCash = firstAccount.dataValues.cash - amount;
        let secondAccountCash = secondAccount.dataValues.cash + amount;
            
        await Account.update(
            { cash: firstAccountCash },
            { where: { id: interaction.options.getString('first-account')}}
        )

        await Account.update(
            { cash: secondAccountCash },
            { where: { id: interaction.options.getString('second-account')}}
        )

        return interaction.reply(`Transfered ${amount} to person`);
    },
};