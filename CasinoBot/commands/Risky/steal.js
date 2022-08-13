const { SlashCommandBuilder } = require('discord.js');

const Account = require('../../database/tables/accounts');
const fixTag = require('../../utils/fix-tag');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('steal')
		.setDescription('Steal some cash from someone!')
        .addStringOption(option =>
            option.setName('victim')
                .setDescription('The victim of your robbery!')
                .setRequired(true)),
	async execute(interaction) {

        let stealer = await Account.findOne(
            { where: { id: interaction.user.id } }
        )

        let victim_id = fixTag(interaction.options.getString('victim'));

        let victim = await Account.findOne(
            { where: { id: victim_id } }
        )

        if(!victim){
            interaction.reply(`The person you tried to steal isn't playing the game!`);
            return;
        }

        let stealResult = Math.floor(Math.random() * 100);

        let newStealerCash;
        let newVictimCash;

        if(stealResult <= 50){

            let stealCash = Math.floor(Math.random() * stealer.dataValues.cash);

            newStealerCash = stealer.dataValues.cash - stealCash;
            newVictimCash = victim.dataValues.cash + stealCash;

            interaction.reply(`${interaction.options.getString('victim')} outplayed you and stole ${stealCash} $ from you instead!`);

        } else {

            let stealCash = Math.floor(Math.random() * victim.dataValues.cash);

            newStealerCash = stealer.dataValues.cash + stealCash;
            newVictimCash = victim.dataValues.cash - stealCash;

            interaction.reply(`You stole ${stealCash} $ from ${interaction.options.getString('victim')}`);
            
        }

        await Account.update(
            { cash:  newStealerCash },
            { where: { id: interaction.user.id }}
        )

        await Account.update(
            { cash: newVictimCash },
            { where: { id: fixTag(interaction.options.getString('victim')) } }
        )

	},
};