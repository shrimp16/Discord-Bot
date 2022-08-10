const { SlashCommandBuilder, normalizeArray } = require('discord.js');

const colors = [
    '🔴',
    '🟢',
    '🔵',
    '⚪',
    '🟠',
    '🟣'
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
                    { name: 'red', value: 'red' },
                    { name: 'green', value: 'green' },
                    { name: 'blue', value: 'blue' },
                    { name: 'white', value: 'white' },
                    { name: 'orange', value: 'orange' },
                    { name: 'purple', value: 'purple' },
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

            console.log(message.reactions.cache.length);

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

        //return interaction.reply(`Roullette! (You picked ${interaction.options.getString('color')})`);
    },
};