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
                    { name: 'red 🔴', value: 'red' },
                    { name: 'green 🟢', value: 'green' },
                    { name: 'blue 🔵', value: 'blue' },
                    { name: 'white ⚪', value: 'white' },
                    { name: 'orange 🟠', value: 'orange' },
                    { name: 'purple 🟣', value: 'purple' },
                )),
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

            emoji = colors[index];

            await message.react(`${colors[index]}`);

            rounds++;

            hasEmoji = true;

            if (rounds < 10) {

                setTimeout(() => {
                    spinWheel();
                }, 1000);

            }

        }

    },
};