const { SlashCommandBuilder } = require('discord.js');
const Account = require('../../database/tables/accounts');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('odd-even')
        .setDescription('Odd or even game!')
        .addStringOption(option =>
            option.setName('odd-even')
                .setDescription('Is it gonna be odd or even?')
                .setRequired(true)
                .addChoices(
                    { name: 'Odd', value: 'odd' },
                    { name: 'Even', value: 'even' }))
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription('The number you want to add up!')
                .setRequired(true)
                .addChoices(
                    { name: '1', value: 1 },
                    { name: '2', value: 2 },
                    { name: '3', value: 3 },
                    { name: '4', value: 4 },
                    { name: '5', value: 5 },
                ))
        .addIntegerOption(option =>
            option.setName('bet')
                .setDescription('The amount of cash you want to bet!')
                .setRequired(true)),
    async execute(interaction) {

        const userBet = interaction.options.getString('odd-even');
        const betAmount = interaction.options.getInteger('bet');
        const userNumber = interaction.options.getInteger('number');

        const randomNumber = Math.floor(Math.random() * 6);

        const user = await Account.findOne({
            where: { id: interaction.user.id }
        })

        if(user.dataValues.wallet_cash < betAmount){
            interaction.reply(`You're trying to bet more money than you have!`);
            return;
        }

        const OddOrEven = ((randomNumber + userNumber) % 2 === 0);

        if (OddOrEven && userBet === 'even') {
            interaction.reply(`I played ${randomNumber} and it's even! you win!`);
            win();
            return;
        } else if (OddOrEven && userBet === 'odd') {
            interaction.reply(`I played ${randomNumber} and it's even! I win!`);
            lose();
            return;
        } else if (!OddOrEven && userBet === 'even') {
            interaction.reply(`I played ${randomNumber} and it's odd! I win!`);
            lose();
            return;
        } else {
            interaction.reply(`I played ${randomNumber} and it's odd! You win!`);
            win();
            return;
        }

        function win() {

            const newCash = user.dataValues.wallet_cash + betAmount;

            pay(newCash);

        }

        function lose() {

            const newCash = user.dataValues.wallet_cash - betAmount;

            pay(newCash);

        }

        async function pay(cash) {
            await Account.update(
                { wallet_cash: cash },
                { where: { id: interaction.user.id } }
            )
        }

    },
};