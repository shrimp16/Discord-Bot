const { SlashCommandBuilder, RequestManager } = require('discord.js');

const Account = require('../../database/tables/accounts');

const colors = [
    {
        color: '🔴',
        value: 'red'
    },
    {
        color: '🟢',
        value: 'green'
    },
    {
        color: '🔵',
        value: 'blue'
    },
    {
        color: '⚪',
        value: 'white'
    },
    {
        color: '🟠',
        value: 'orange'
    },
    {
        color: '🟣',
        value: 'purple'
    },
]

module.exports = {
    data: new SlashCommandBuilder()
        .setName('magic-wheel')
        .setDescription('Spin the wheel and try to win!')
        .addStringOption(option =>
            option.setName('color')
                .setDescription('The color you want to bet on!')
                .setRequired(true)
                .addChoices(
                    { name: 'Red 🔴', value: 'red' },
                    { name: 'Green 🟢', value: 'green' },
                    { name: 'Blue 🔵', value: 'blue' },
                    { name: 'White ⚪', value: 'white' },
                    { name: 'Orange 🟠', value: 'orange' },
                    { name: 'Purple 🟣', value: 'purple' },
                ))
        .addIntegerOption(option =>
            option.setName('bet-value')
                .setDescription('The amount of cash you want to bet!')
                .setRequired(true)),
    async execute(interaction) {

        const account = await Account.findOne(
            { where: { id: interaction.user.id } }
        )

        if(account.dataValues.wallet_cash < interaction.options.getInteger('bet-value')){
            interaction.reply(`You're trying to bet more money than you have!`);
            return;
        }

        let newCash = account.dataValues.wallet_cash - interaction.options.getInteger('bet-value');

        const message = await interaction.reply(
            {
                content: 'Magic-Wheel!',
                fetchReply: true
            }
        );

        await message.react('🏆');

        let rounds = 0;

        let emoji;

        let hasEmoji = false;

        spinWheel();

        async function spinWheel() {

            if (hasEmoji) {
                await message.reactions.cache.get(emoji.color).remove()
                    .catch(error => console.log(`Something went wrong! Error : ${error}`));
                hasEmoji = false;
            }

            index = Math.floor(Math.random() * colors.length);

            emoji = colors[index];

            await message.react(`${emoji.color}`);

            rounds++;

            hasEmoji = true;

            if (rounds < 10) {

                setTimeout(() => {
                    spinWheel();
                }, 500);

            }

            if (rounds === 10) {
 
                if (interaction.options.getString('color') === emoji.value) {
                    newCash += (interaction.options.getInteger('bet-value') * 2);
                    credit();
                    message.edit('Congratulations! You won!');
                    return;
                } else {
                    credit();
                    message.edit('You lost!');
                    return;
                }

            }

        }

        async function credit(){

            await Account.update(
                { wallet_cash: newCash },
                { where: { id: interaction.user.id } }
            )

        }

    },
};