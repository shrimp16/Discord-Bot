const { SlashCommandBuilder, normalizeArray } = require('discord.js');

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
                await message.reactions.cache.get(emoji).remove()
                    .catch(error => console.log("shit"));
                hasEmoji = false;
            }

            index = Math.floor(Math.random() * colors.length);

            emoji = colors[index].color;

            await message.react(`${colors[index].color}`);

            rounds++;

            hasEmoji = true;

            if (rounds < 10) {

                setTimeout(() => {
                    spinWheel();
                }, 500);

            }

        }

    },
};